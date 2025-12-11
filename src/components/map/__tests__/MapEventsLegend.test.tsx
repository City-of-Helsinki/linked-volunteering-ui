import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import MapEventsLegend from '../MapEventsLegend';

const messages = {
  'map.legend.title': 'Legend',
  'map.legend.upcoming': 'Upcoming events',
  'map.legend.past': 'Past events',
};

describe('MapEventsLegend', () => {
  const renderLegend = () =>
    render(
      <IntlProvider locale="en" messages={messages}>
        <MapEventsLegend />
      </IntlProvider>
    );

  it('renders legend title and items with translations', () => {
    renderLegend();

    expect(screen.getByText('Legend')).toBeInTheDocument();
    expect(screen.getByText('Upcoming events')).toBeInTheDocument();
    expect(screen.getByText('Past events')).toBeInTheDocument();
  });

  it('shows color indicators for each legend item', () => {
    renderLegend();

    const indicators = screen.getAllByTestId('legend-indicator');
    expect(indicators).toHaveLength(2);
  });
});
