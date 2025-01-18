import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, } from 'react-router-dom';

import { setCustomer } from '../../features/customerSlice';
import { signinCustomer } from '../../../api/customerApi';
import { saveCustomerToLocal } from '../../features/customerStorage';


export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const loginCustomerObj = {
        email: "",
        password: "",
    };
    const [loginCustomer, setLoginCustomer] = useState(loginCustomerObj);
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;

        setLoginCustomer({ ...loginCustomer, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await signinCustomer(loginCustomer.email, loginCustomer.password);

            if (result.status = "200") {
                const currentCustomer = {
                    customerId: result.data.id,
                    email: result.data.email,
                    firstName: result.data.firstName,
                    middleName: result.data.middleName,
                    lastName: result.data.lastName,
                    driverLicenseNumber: result.data.driverLicenseNumber
                }

                saveCustomerToLocal(currentCustomer);
                dispatch(setCustomer(currentCustomer));

                navigate(from.pathname, { replace: true });
            } else {
                setError('The username or email or password does not match')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="login-container auth-container">
            <main className="auth-wrap">
                <div className="auth-title">
                    <h2>Sign in to Car Leasing</h2>
                </div>

                <div className="auth-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-input-wrap">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-input"
                                id="email"
                                name="email"
                                value={loginCustomer.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-input-wrap">
                            <label htmlFor="password" className="form-label">
                                Password
                                <a href="/reset-password" className="reset-password">Forget?</a>
                            </label>
                            <input
                                type="password"
                                className="form-input"
                                id="password"
                                name="password"
                                value={loginCustomer.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {error && <div className="error">{error}</div>}
                        <button type="submit" className="sign-in button-black">Sign In</button>

                        <p className="sign-up">
                            Don't have an account? <a href="/register">Sign Up</a>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    )
}
