import { get, post, put, patch, remove } from '../api';

// Mock environment variables
jest.mock('../environment', () => ({
  REACT_APP_API_URL: 'https://test-api.com',
}));

describe('API Utils', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make GET request with correct parameters', async () => {
    const mockData = { test: 'data' };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    await get('test-endpoint', { param: 'value' }, 'test-token');

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('tt'), {
      headers: {
        Authorization: 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      method: 'GET',
      signal: expect.any(Object),
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://test-api.com/v1/test-endpoint?param=value',

      expect.objectContaining({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
        signal: {},
      }),
    );
  });

  it('should make POST request with correct body', async () => {
    const mockData = { test: 'data' };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const postData = { name: 'test' };
    await post('test-endpoint', postData, 'test-token');

    expect(fetch).toHaveBeenCalledWith(
      'https://test-api.com/v1/test-endpoint',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
      }),
    );
  });

  it('should handle error responses', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    await expect(get('test-endpoint')).rejects.toThrow('HTTP error! status: 400');
  });

  it('should handle network timeouts', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network timeout'));

    await expect(get('test-endpoint')).rejects.toThrow('Network timeout');
  });
});
