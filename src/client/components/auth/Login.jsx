import React from 'react'

export default function Login() {
    return (
        <div className="login-container auth-container">
            <main className="auth-wrap">
                <div className="auth-title">
                    <h2>Sign in to Car Leasing</h2>
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
                            <label htmlFor="password" className="form-label">
                                Password
                                <a href="/reset-password" className="reset-password">Forget?</a>
                            </label>
                            <input
                                type="password"
                                className="form-input"
                                id="password"
                                name="password"
                                required
                            />
                        </div>

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
