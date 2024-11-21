import React from 'react'

export default function Register() {
    return (
        <div className="register-container auth-container">
            <main className="auth-wrap">
                <div className="auth-title">
                    <h2>Sign up to Car Leasing</h2>
                </div>

                <div className="auth-form">
                    <form>
                        <div className="form-input-wrap">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-input"
                                id="email"
                                name="email"
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
                                required
                            />
                        </div>

                        <div className="form-input-wrap">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="confirmPassword"
                                className="form-input"
                                id="confirmPassword"
                                name="confirmPassword"
                                required
                            />
                        </div>

                        <button type="submit" className="sign-in button-black">Sign In</button>

                    </form>
                </div>
            </main>
        </div>
    )
}
