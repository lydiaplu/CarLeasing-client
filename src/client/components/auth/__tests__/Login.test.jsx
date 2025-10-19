// client/components/auth/__tests__/Login.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Login from '../Login';

// mock 掉外部依赖
jest.mock('../../../../api/customerApi', () => ({
    signinCustomer: jest.fn(),
}));

jest.mock('../../../features/customerStorage', () => ({
    saveCustomerToLocal: jest.fn(),
}));

jest.mock('../../../features/customerSlice', () => ({
    setCustomer: jest.fn((data) => ({ type: 'SET_CUSTOMER', payload: data })),
}));

const { signinCustomer } = require('../../../../api/customerApi');
const { saveCustomerToLocal } = require('../../../features/customerStorage');

const mockStore = configureStore([]);

describe('<Login />', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
        store.dispatch = jest.fn();
    });

    function renderLogin() {
        return render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/login']}>
                    <Login />
                </MemoryRouter>
            </Provider>
        );
    }

    test('renders login form correctly', () => {
        renderLogin();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    });

    test('calls signinCustomer and saves customer when login is successful', async () => {
        signinCustomer.mockResolvedValueOnce({
            status: 200,
            data: {
                id: 1,
                email: 'test@example.com',
                firstName: 'John',
                middleName: 'M',
                lastName: 'Doe',
                driverLicenseNumber: '12345'
            }
        });

        renderLogin();

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

        await waitFor(() => {
            expect(signinCustomer).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(saveCustomerToLocal).toHaveBeenCalled();
            expect(store.dispatch).toHaveBeenCalled();
        });
    });

    test('shows error message on failed login', async () => {
        signinCustomer.mockResolvedValueOnce({ status: 401 });

        renderLogin();

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'wrong@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpass' } });

        fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

        await waitFor(() => {
            expect(screen.getByText(/does not match/i)).toBeInTheDocument();
        });
    });
});
