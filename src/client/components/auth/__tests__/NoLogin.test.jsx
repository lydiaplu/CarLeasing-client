// src/client/components/auth/__tests__/NoLogin.test.jsx
import { render, screen } from '@testing-library/react';
import NoLogin from '../NoLogin';

describe('<NoLogin />', () => {
    test('renders title and texts', () => {
        render(<NoLogin />);

        // 检查标题
        expect(screen.getByText(/You are not logged in/i)).toBeInTheDocument();

        // 检查提示文字
        expect(
            screen.getByText(/Please log in to access your account/i)
        ).toBeInTheDocument();

        // 检查登录链接
        const loginLink = screen.getByRole('link', { name: /Sign in/i });
        expect(loginLink).toHaveAttribute('href', '/login');

        // 检查注册链接
        const registerLink = screen.getByRole('link', { name: /Register Here/i });
        expect(registerLink).toHaveAttribute('href', '/register');
    });
});
