import React from 'react'
import { Link } from 'react-router-dom'
import { CiLogin } from "react-icons/ci";

export default function LoginDropdown() {
    return (
        <div className="login-dropdown-container">
            <Link className='dropdown-item' to={"/login"}>
                <i className='icon'><CiLogin /></i>
                Login
            </Link>
        </div>
    )
}
