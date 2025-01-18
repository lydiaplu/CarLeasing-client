import React from 'react'

export default function NoLogin() {
    return (
        <div className="no-login">
            <h1 className="auth-title">You are not logged in</h1>
            <div className="auth-contex">
                <p className="auth-text">
                    Please log in to access your account.
                    <a href="/login" className="auth-link">
                        Sign in
                    </a>
                </p>
                <p className="auth-text">
                    If you don't have an accoun.
                    <a href="/register" className="auth-link auth-register">
                        Register Here
                    </a>
                </p>
            </div>
        </div>
    )
}
