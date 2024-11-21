import React from 'react'

export default function ResetPassword() {
    return (
        <div className="reset-password-container auth-container">
            <main className="auth-wrap">
                <div className="auth-title">
                    <h2>Reset Password?</h2>
                </div>

                <div className="reset-password-instructions">
                    <p>Enter the email address you used when you joined and we’ll send you instructions to reset your password.</p>
                    <p>For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.</p>
                </div>

                <div className="auth-form">
                    <form>
                        <div className="form-input-wrap">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="form-input"
                                id="email"
                                name="email"
                                required
                            />
                        </div>

                        <button type="submit" className="reset button-black">
                            Send Reset Instructions
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}
