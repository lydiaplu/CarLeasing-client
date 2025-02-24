import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import CustomerDropdown from './CustomerDropdown';
import LogoutDropdown from './LogoutDropdown';
import LoginDropdown from './LoginDropdown';

function NavBar() {
    const currentCustomer = useSelector((state) => state.customer).currentCustomer;
    console.log("NavBar currentCustomer: ", currentCustomer);

    const [showAccount, setShowAccount] = useState(false);

    const handleAccountClick = () => {
        setShowAccount(!showAccount);
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
            <div className="container-fluid">

                {/* Logo */}
                <Link to={"/"} className="navbar-brand">
                    <span className="hotel-color">DriveHub</span>
                </Link>

                {/* 手机版的导航按钮 */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* nav list */}
                <div className="collapse navbar-collapse" id="navbarScroll">

                    {/* the left nav button */}
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to={"/browse-all-cars"} >
                                Browse all cars
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/find-booking"}>
                                Find my booking
                            </NavLink>
                        </li>
                    </ul>

                    {/* the right nav button */}
                    <ul className="d-flex navbar-nav">
                        {/* {isLoggedIn && userRole === "ROLE_ADMIN" && (
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to={"/admin"} >
                                    Admin
                                </NavLink>
                            </li>
                        )} */}

                        <li className="nav-item dropdown">
                            <a
                                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleAccountClick}
                            >
                                {" "}
                                Account
                            </a>

                            <div
                                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby="navbarDropdown"
                            >
                                <ul className='dropdown-menu-list'>
                                    {currentCustomer ? (
                                        <>
                                            <li>
                                                <CustomerDropdown currentCustomer={currentCustomer} />
                                            </li>
                                            <li>
                                                <LogoutDropdown />
                                            </li>
                                        </>
                                    ) : (
                                        <li>
                                            <LoginDropdown />
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
