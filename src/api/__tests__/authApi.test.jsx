// src/api/__tests__/authApi.test.jsx
import { registerUser, authenticateUser } from '../authApi';
import { api, getHeader } from '../apiConfig';

// 🔧 mock 掉 api 和 getHeader，避免真实网络请求
jest.mock('../apiConfig', () => ({
    api: { post: jest.fn() },
    getHeader: jest.fn(() => ({ Authorization: 'Bearer token' })),
}));

describe('registerUser', () => {
    test('should call api.post with correct URL and payload', async () => {
        const mockResponse = { status: 201, data: { success: true } };
        api.post.mockResolvedValueOnce(mockResponse);

        const loginRequest = { username: 'test', password: '1234' };
        const response = await registerUser(loginRequest);

        expect(api.post).toHaveBeenCalledWith('/auth/register-user', loginRequest);
        expect(response).toEqual(mockResponse);
    });
});

describe('authenticateUser', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call api.post with FormData and return data when status 200', async () => {
        const mockResponse = { status: 200, data: { token: 'abc123' } };
        api.post.mockResolvedValueOnce(mockResponse);

        const userInfo = { usernameOrEmail: 'test@example.com', password: '1234' };
        const result = await authenticateUser(userInfo);

        // ✅ 确认 URL、headers 正确
        expect(api.post).toHaveBeenCalledTimes(1);
        const [url, formData, config] = api.post.mock.calls[0];
        expect(url).toBe('/users/login');
        expect(config.headers['Content-Type']).toBe('multipart/form-data');

        // ✅ 返回结果正确
        expect(result).toEqual({ token: 'abc123' });
    });

    test('should return false when status is not 200', async () => {
        const mockResponse = { status: 401 };
        api.post.mockResolvedValueOnce(mockResponse);

        const userInfo = { usernameOrEmail: 'test@example.com', password: 'wrong' };
        const result = await authenticateUser(userInfo);

        expect(result).toBe(false);
    });
});
