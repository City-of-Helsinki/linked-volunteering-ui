import authService from '../authService';

// Setup environment variable
// Mock environment variables before importing the service
jest.mock('../../../utils/environment', () => ({
  REACT_APP_API_URL: 'https://test-api.com',
}));

describe('authService', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getCurrentUserData', () => {
    it('should fetch user data with correct headers when token provided', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      const token = 'test-token';
      const result = await authService.getCurrentUserData(token);

      expect(global.fetch).toHaveBeenCalledWith('https://test-api.com/v1/user/me/', {
        headers: {
          Authorization: 'Bearer test-token',
          'Content-Type': 'application/json',
        },
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw error when response is not ok', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      const token = 'invalid-token';
      await expect(authService.getCurrentUserData(token)).rejects.toThrow(
        'HTTP error! status: 401',
      );
    });

    it('should handle network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const token = 'test-token';
      await expect(authService.getCurrentUserData(token)).rejects.toThrow('Network error');
    });

    it('should handle undefined token', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      await authService.getCurrentUserData(undefined);

      expect(global.fetch).toHaveBeenCalledWith('https://test-api.com/v1/user/me/', {
        headers: {
          Authorization: 'Bearer undefined',
          'Content-Type': 'application/json',
        },
      });
    });
  });
});
