import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

function SideBar({ isSideBarOpen }) {
    const location = useLocation();

    const [mainPage, setMainPage] = useState("dashboard");
    const [page, setPage] = useState("rentalinsights");

    useEffect(() => {
        const lastPart = location.pathname.split('/').pop();
        setPage(lastPart);
    }, [location])



    const navToggleClick = (event) => {
        // find the closest ancestor li
        const navLi = event.target.closest("li");

        // check if the li parent is current ul
        const currentUl = event.currentTarget;
        if (navLi.parentElement === currentUl) {
            console.log(navLi);
            navLi.classList.toggle('menu-open');
        }
    }

    return (
        <aside
            className={["app-sidebar bg-body-secondary shadow", isSideBarOpen && "sidebar-collapse"].filter(Boolean).join(' ')}
            data-bs-theme="dark">
            {/* <!--begin::Sidebar Brand--> */}
            <div className="sidebar-brand">
                {/* <!--begin::Brand Image--> */}
                <Link to={"/"} className="brand-link">
                    <span className="hotel-color">DriveHub</span>
                </Link>
                {/* <!--end::Brand Image--> */}
                {/* <!--begin::Brand Text--> */}
                <span className="brand-text fw-light">Admin</span>
                {/* <!--end::Brand Text--> */}
            </div>
            {/* <!--end::Sidebar Brand--> */}

            {/* <!--begin::Sidebar Wrapper--> */}
            <div className="sidebar-wrapper">
                <nav className="mt-2">
                    {/* <!--begin::Sidebar Menu--> */}
                    <ul
                        className="nav sidebar-menu flex-column"
                        data-lte-toggle="treeview"
                        role="menu"
                        data-accordion="false"
                        onClick={navToggleClick}
                    >
                        {/* dashboard */}
                        <li className={["nav-item", mainPage === "dashboard" && "menu-open"].filter(Boolean).join(' ')}>
                            <a
                                href="#"
                                className={["nav-link", mainPage === "dashboard" && "active"].filter(Boolean).join(' ')}
                            >
                                <i className="nav-icon bi bi-speedometer"></i>
                                <p>
                                    Dashboard
                                    <i className="nav-arrow bi bi-chevron-right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link
                                        to="rentalinsights"
                                        className={["nav-link", page === "rentalinsights" && "active"].filter(Boolean).join(' ')}
                                    >
                                        <i className="nav-icon bi bi-circle"></i>
                                        <p>Rental Insights</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/* cars */}
                        <li className={["nav-item", mainPage === "cars" && "menu-open"].filter(Boolean).join(' ')}>
                            <a
                                href="#"
                                className={["nav-link", mainPage === "cars" && "active"].filter(Boolean).join(' ')}
                            >
                                <i className="nav-icon bi bi-car-front-fill"></i>
                                <p>
                                    Car Management
                                    <i className="nav-arrow bi bi-chevron-right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link
                                        to="cars"
                                        className={["nav-link", page === "cars" && "active"].filter(Boolean).join(' ')}
                                    >
                                        <i className="nav-icon bi bi-circle"></i>
                                        <p>Cars</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="cartypes"
                                        className={["nav-link", page === "cartypes" && "active"].filter(Boolean).join(' ')}
                                    >
                                        <i className="nav-icon bi bi-circle"></i>
                                        <p>Car Types</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="carbrands"
                                        className={["nav-link", page === "carbrands" && "active"].filter(Boolean).join(' ')}
                                    >
                                        <i className="nav-icon bi bi-circle"></i>
                                        <p>Car Brands</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="maintenances"
                                        className={["nav-link", page === "maintenances" && "active"].filter(Boolean).join(' ')}
                                    >
                                        <i className="nav-icon bi bi-circle"></i>
                                        <p>Car Maintenances</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="insurances"
                                        className={["nav-link", page === "insurances" && "active"].filter(Boolean).join(' ')}
                                    >
                                        <i className="nav-icon bi bi-circle"></i>
                                        <p>Car Insurances</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="violations"
                                        className={["nav-link", page === "violations" && "active"].filter(Boolean).join(' ')}
                                    >
                                        <i className="nav-icon bi bi-circle"></i>
                                        <p>Car Violations</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="reviews"
                                        className={["nav-link", page === "reviews" && "active"].filter(Boolean).join(' ')}
                                    >
                                        <i className="nav-icon bi bi-circle"></i>
                                        <p>Car Reviews</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-header">MAIN MODULES</li>


                        <li className="nav-item">
                            <Link
                                to="rentals"
                                className={["nav-link", page === "rentals" && "active"].filter(Boolean).join(' ')}
                            >
                                <i className="nav-icon bi bi-receipt-cutoff"></i>
                                <p>Rentals</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="payments"
                                className={["nav-link", page === "payments" && "active"].filter(Boolean).join(' ')}
                            >
                                <i className="nav-icon bi bi-currency-dollar"></i>
                                <p>Payments</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="customers"
                                className={["nav-link", page === "customers" && "active"].filter(Boolean).join(' ')}
                            >
                                <i className="nav-icon bi bi-people-fill"></i>
                                <p>Customers</p>
                            </Link>
                        </li>

                        {/* <li className="nav-header">ADMINISTRATOR</li>

                        <li className="nav-item">
                            <a
                                href=""
                                className={["nav-link", page === "customers" && "active"].filter(Boolean).join(' ')}
                            >
                                <i className="nav-icon bi bi-person-lines-fill"></i>
                                <p>Admin Users</p>
                            </a>
                        </li> */}
                    </ul>
                    {/* <!--end::Sidebar Menu--> */}
                </nav>
            </div>
            {/* <!--end::Sidebar Wrapper--> */}
        </aside>
    )
}

export default SideBar
