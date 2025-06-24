import * as Sentry from '@sentry/browser';
import { get, post, put, patch, remove } from '../api';

vi.mock('@sentry/browser');

vi.mock('../environment', () => ({
  REACT_APP_API_URL: 'https://test-api.com',
}));

global.fetch = vi.fn();

describe('API utility functions', () => {
  const mockResponse = (status, data) =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(data),
    });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('get() makes a GET request and returns data', async () => {
    fetch.mockResolvedValue(mockResponse(200, { success: true }));
    const data = await get('test-endpoint');
    expect(fetch).toHaveBeenCalledWith(
      expect.any(URL),
      expect.objectContaining({ method: 'GET' })
    );
    expect(data).toEqual({ success: true });
  });

  test('post() makes a POST request with data', async () => {
    fetch.mockResolvedValue(mockResponse(201, { id: 1 }));
    const data = await post('test-endpoint', { name: 'Test' });
    expect(fetch).toHaveBeenCalledWith(
      expect.any(URL),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'Test' }),
      })
    );
    expect(data).toEqual({ id: 1 });
  });

  test('put() makes a PUT request with data', async () => {
    fetch.mockResolvedValue(mockResponse(200, { updated: true }));
    const data = await put('test-endpoint', { name: 'Updated' });
    expect(fetch).toHaveBeenCalledWith(
      expect.any(URL),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({ name: 'Updated' }),
      })
    );
    expect(data).toEqual({ updated: true });
  });

  test('patch() makes a PATCH request with data', async () => {
    fetch.mockResolvedValue(mockResponse(200, { patched: true }));
    const data = await patch('test-endpoint', { name: 'Patched' });
    expect(fetch).toHaveBeenCalledWith(
      expect.any(URL),
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ name: 'Patched' }),
      })
    );
    expect(data).toEqual({ patched: true });
  });

  test('remove() makes a DELETE request', async () => {
    fetch.mockResolvedValue(mockResponse(204, {}));
    const data = await remove('test-endpoint');
    expect(fetch).toHaveBeenCalledWith(
      expect.any(URL),
      expect.objectContaining({ method: 'DELETE' })
    );
    expect(data).toEqual({});
  });

  test('handles API errors and reports to Sentry', async () => {
    fetch.mockResolvedValue(mockResponse(500, { error: 'Server error' }));
    await expect(get('test-endpoint')).rejects.toThrow(
      'HTTP error! status: 500'
    );
    expect(Sentry.captureException).toHaveBeenCalled();
  });
});
