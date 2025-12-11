import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import L from 'leaflet';
import EventMarkers from '../EventMarkers';
import { Event } from '../../../store/types';

// Test constants
const HELSINKI_COORDINATES: [number, number] = [24.945831, 60.192059];
const PAST_EVENT_COLOR = '#999999';
const UPCOMING_EVENT_COLOR = '#00d7a7';
const ICON_SIZE = [25, 41] as const;
const ICON_ANCHOR = [13, 41] as const;
const POPUP_ANCHOR = [0, -41] as const;
const SVG_ATTRIBUTES = {
  width: '25',
  height: '41',
  viewBox: '0 0 25 41',
  xmlns: 'http://www.w3.org/2000/svg',
} as const;

// Mock Leaflet to avoid DOM manipulation issues in tests
vi.mock('leaflet', () => ({
  default: {
    DivIcon: vi.fn().mockImplementation((options) => ({
      options,
      toString: () => 'MockDivIcon',
    })),
  },
  DivIcon: vi.fn().mockImplementation((options) => ({
    options,
    toString: () => 'MockDivIcon',
  })),
}));

// Mock react-leaflet components
vi.mock('react-leaflet', () => ({
  Marker: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="marker">{children}</div>
  ),
  Tooltip: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tooltip">{children}</div>
  ),
}));

// Test data
const createMockEvent = (overrides: Partial<Event> = {}): Event => ({
  id: 1,
  state: 'approved',
  name: 'Test Event',
  description: 'Test description',
  start_time: '2024-01-15T10:00:00Z',
  end_time: '2024-01-15T12:00:00Z',
  organizer_first_name: 'John',
  organizer_last_name: 'Doe',
  organizer_email: 'john@example.com',
  organizer_phone: '123456789',
  targets: 'Test targets',
  maintenance_location: 'Test location',
  additional_information: 'Additional info',
  location: {
    type: 'Point',
    coordinates: HELSINKI_COORDINATES,
  },
  ...overrides,
});

const pastEvent = createMockEvent({
  id: 2,
  name: 'Past Event',
  start_time: '2023-01-15T10:00:00Z',
  end_time: '2023-01-15T12:00:00Z',
});

const upcomingEvent = createMockEvent({
  id: 3,
  name: 'Upcoming Event',
  start_time: '2030-01-15T10:00:00Z',
  end_time: '2030-01-15T12:00:00Z',
});

const eventWithoutLocation = createMockEvent({
  id: 4,
  name: 'Event Without Location',
  location: undefined,
});

describe('EventMarkers', () => {
  const renderWithIntl = (ui: React.ReactNode, locale = 'fi') =>
    render(
      <IntlProvider locale={locale} messages={{}}>
        {ui}
      </IntlProvider>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Icon Creation Logic', () => {
    it('creates gray icon for past events', () => {
      const events = [pastEvent];

      renderWithIntl(<EventMarkers events={events} />);

      // Check that DivIcon was called with gray color for past events
      expect(L.DivIcon).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining(PAST_EVENT_COLOR),
          className: 'event-marker',
          iconSize: ICON_SIZE,
          iconAnchor: ICON_ANCHOR,
          popupAnchor: POPUP_ANCHOR,
        })
      );
    });

    it('creates green icon for upcoming events', () => {
      const events = [upcomingEvent];

      renderWithIntl(<EventMarkers events={events} />);

      // Check that DivIcon was called with green color for upcoming events
      expect(L.DivIcon).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining(UPCOMING_EVENT_COLOR),
          className: 'event-marker',
          iconSize: ICON_SIZE,
          iconAnchor: ICON_ANCHOR,
          popupAnchor: POPUP_ANCHOR,
        })
      );
    });

    it('generates valid SVG markup', () => {
      const events = [upcomingEvent];

      renderWithIntl(<EventMarkers events={events} />);

      const callArgs = (L.DivIcon as unknown as ReturnType<typeof vi.fn>).mock
        .calls[0][0];
      expect(callArgs.html).toContain('<svg');
      expect(callArgs.html).toContain(`width="${SVG_ATTRIBUTES.width}"`);
      expect(callArgs.html).toContain(`height="${SVG_ATTRIBUTES.height}"`);
      expect(callArgs.html).toContain(`viewBox="${SVG_ATTRIBUTES.viewBox}"`);
      expect(callArgs.html).toContain(`xmlns="${SVG_ATTRIBUTES.xmlns}"`);
    });
  });

  describe('Basic Component Rendering', () => {
    it('renders without crashing with empty events array', () => {
      const { container } = renderWithIntl(<EventMarkers events={[]} />);

      // Component returns null when there are no events
      expect(container.firstChild).toBeNull();
    });

    it('renders without crashing with valid events', () => {
      const events = [upcomingEvent];

      const { container } = renderWithIntl(<EventMarkers events={events} />);

      expect(container.firstChild).toBeTruthy();
    });

    it('renders markers for events with valid coordinates', () => {
      const events = [upcomingEvent];

      const { getAllByTestId } = renderWithIntl(
        <EventMarkers events={events} />
      );

      const markers = getAllByTestId('marker');
      expect(markers).toHaveLength(1);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles null events array gracefully', () => {
      // @ts-expect-error Testing invalid input
      const { container } = renderWithIntl(<EventMarkers events={null} />);

      // Component returns null when events is null
      expect(container.firstChild).toBeNull();
    });

    it('handles undefined events array gracefully', () => {
      // @ts-expect-error Testing invalid input
      const { container } = renderWithIntl(<EventMarkers events={undefined} />);

      // Component returns null when events is undefined
      expect(container.firstChild).toBeNull();
    });

    it('filters out events without location coordinates', () => {
      const events = [upcomingEvent, eventWithoutLocation];

      const { getAllByTestId } = renderWithIntl(
        <EventMarkers events={events} />
      );

      const markers = getAllByTestId('marker');
      expect(markers).toHaveLength(1); // Only the event with coordinates should render
    });
  });

  describe('Tooltip Content', () => {
    it('displays event name in tooltip', () => {
      const events = [upcomingEvent];

      renderWithIntl(<EventMarkers events={events} />);

      expect(screen.getByText('Upcoming Event')).toBeInTheDocument();
    });

    it('displays formatted date in tooltip', () => {
      const events = [upcomingEvent];

      renderWithIntl(<EventMarkers events={events} />);

      // Check that the date appears in the tooltip (using flexible text matching)
      expect(
        screen.getByText((content) => content.includes('15.1.2030'))
      ).toBeInTheDocument();
    });

    it('displays maintenance location when present', () => {
      const eventWithLocation = createMockEvent({
        maintenance_location: 'Specific Park Location',
      });

      renderWithIntl(<EventMarkers events={[eventWithLocation]} />);

      // Use flexible text matching to find the maintenance location
      expect(
        screen.getByText((content) =>
          content.includes('Specific Park Location')
        )
      ).toBeInTheDocument();
    });

    it('does not display maintenance location when empty', () => {
      const eventWithoutMaintenanceLocation = createMockEvent({
        maintenance_location: '',
      });

      renderWithIntl(
        <EventMarkers events={[eventWithoutMaintenanceLocation]} />
      );

      // Should not find the default maintenance location text
      expect(screen.queryByText('Test location')).not.toBeInTheDocument();
    });

    it('renders tooltip with correct structure', () => {
      const events = [upcomingEvent];

      renderWithIntl(<EventMarkers events={events} />);

      const tooltip = screen.getByTestId('tooltip');
      expect(tooltip).toBeInTheDocument();

      // Check that tooltip contains the expected content structure
      const strongElement = tooltip.querySelector('strong');
      expect(strongElement).toHaveTextContent('Upcoming Event');
    });
  });
});
