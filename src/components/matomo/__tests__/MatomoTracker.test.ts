import { TRACK_TYPES } from '../constants';
import MatomoTracker from '../MatomoTracker';

const MOCK_URL_BASE = 'https://www.test.fi/';
const MOCK_TRACKER_URL = 'https://www.test.fi/matomo.php';

describe('MatomoTracker', () => {
  beforeEach(() => {
    window._paq = [];
  });

  it('should initialise window._paq', () => {
    const tracker = new MatomoTracker({
      urlBase: MOCK_URL_BASE,
      siteId: 123,
      srcUrl: 'test.js',
      enabled: true,
      configurations: {
        foo: 'bar',
        testArray: ['testArrayItem1', 'testArrayItem2'],
        testNoValue: undefined,
      },
    });

    expect(tracker).toBeDefined();
    expect(window._paq).toEqual([
      ['setTrackerUrl', MOCK_TRACKER_URL],
      ['setSiteId', 123],
      ['foo', 'bar'],
      ['testArray', 'testArrayItem1', 'testArrayItem2'],
      ['testNoValue'],
      ['enableLinkTracking', true],
    ]);
  });

  it('should throw error if urlBase missing', () => {
    // @ts-ignore
    expect(() => new MatomoTracker({ siteId: 123, srcUrl: 'test.js' })).toThrow(
      Error
    );
  });

  it('should throw error if siteId missing', () => {
    expect(
      () =>
        // @ts-ignore
        new MatomoTracker({
          urlBase: 'https://www.test.fi',
          srcUrl: 'test.js',
        })
    ).toThrow(Error);
  });

  it('should track page view', () => {
    const tracker = new MatomoTracker({
      urlBase: MOCK_URL_BASE,
      siteId: 123,
      srcUrl: 'test.js',
      enabled: true,
      configurations: {},
    });

    tracker.trackPageView({});

    expect(window._paq).toEqual([
      ['setTrackerUrl', MOCK_TRACKER_URL],
      ['setSiteId', 123],
      ['enableLinkTracking', true],
      ['setCustomUrl', window.location.href],
      ['setDocumentTitle', ''],
      [TRACK_TYPES.TRACK_VIEW],
    ]);
  });

  it('should track custom event', () => {
    const tracker = new MatomoTracker({
      urlBase: MOCK_URL_BASE,
      siteId: 123,
      srcUrl: 'test.js',
      enabled: true,
      configurations: {},
    });

    tracker.track({
      data: ['event', 'click', 'button'],
      documentTitle: 'Custom Event',
      href: 'https://www.test.fi/custom-event',
    });

    expect(window._paq).toEqual([
      ['setTrackerUrl', MOCK_TRACKER_URL],
      ['setSiteId', 123],
      ['enableLinkTracking', true],
      ['setCustomUrl', 'https://www.test.fi/custom-event'],
      ['setDocumentTitle', 'Custom Event'],
      ['event', 'click', 'button'],
    ]);
  });
});
