import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, } from 'react-router-dom';

import { saveCustomerToLocal } from '../../features/customerStorage';
import { setCustomer } from '../../features/customerSlice';
import { registerCustomer, getCustomerByEmail } from '../../../api/customerApi';

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const loginCustomerObj = {
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: ""
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

        if (!validForm()) {
            return false;
        }

        try {
            const result = await registerCustomer(loginCustomer.email, loginCustomer.password);

            if (result.status = "200") {
                const currentCustomer = {
                    customerId: result.data.id,
                    email: result.data.email
                    // firstName: result.firstName,
                    // middleName: result.middleName,
                    // lastName: result.lastName,
                    // driverLicenseNumber: result.driverLicenseNumber
                }

                saveCustomerToLocal(currentCustomer);
                dispatch(setCustomer(currentCustomer))

                navigate(from.pathname, { replace: true });
            } else {
                setError('The username or email or password does not match')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    const validForm = () => {

        // valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(loginCustomer.email)) {
            setError("Please enter a valid email address!");
            return false;
        }

        // valid conform password
        if (loginCustomer.password.length < 6) {
            setError("The password must be at least 6 characters long.");
            return false;
        }

        // valid conform email
        if (loginCustomer.email !== loginCustomer.confirmEmail) {
            setError("The email do not match. Please check and try again.");
            return false;
        }

        // valid conform password
        if (loginCustomer.password !== loginCustomer.confirmPassword) {
            setError("The passwords do not match. Please check and try again.");
            return false;
        }

        return true;
    }

    return (
        <div className="register-container auth-container">

            <main className="auth-wrap">
                <div className="auth-title">
                    <h2>Sign up to Car Leasing</h2>
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
                            <label htmlFor="confirmEmail" className="form-label">
                                Confirm Email
                            </label>
                            <input
                                type="confirmEmail"
                                className="form-input"
                                id="confirmEmail"
                                name="confirmEmail"
                                value={loginCustomer.confirmEmail}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-input-wrap">
                            <label htmlFor="password" className="form-label">
                                Password
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

                        <div className="form-input-wrap">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-input"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={loginCustomer.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {error && <div className="error">{error}</div>}
                        <button type="submit" className="sign-in button-black">Sign Up</button>
                    </form>
                </div>
            </main>
        </div>
    )
}
