import React from 'react'

import profilePhoto from "../../temporaryAssets/images/user.JPG"

function TopBar({toggleSideBar}) {
    return (
        <nav className="app-header navbar navbar-expand bg-body">
            {/* <!--begin::Container--> */}
            <div className="container-fluid">
                {/* <!--begin::Start Navbar Links--> */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-lte-toggle="sidebar" href="#" role="button" onClick={toggleSideBar}>
                            <i className="bi bi-list"></i>
                        </a>
                    </li>
                </ul>
                {/* <!--end::Start Navbar Links--> */}

                {/* <!--begin::End Navbar Links--> */}
                <ul className="navbar-nav ms-auto">

                    {/* <!--begin::User Menu Dropdown--> */}
                    <li className="nav-item dropdown user-menu">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <img
                                src={profilePhoto}
                                className="user-image rounded-circle shadow"
                                alt="User Image"
                            />
                            <span className="d-none d-md-inline">Pan Lydia Lu</span>
                        </a>

                        <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                            {/* <!--begin::User Image--> */}
                            <li className="user-header text-bg-primary">
                                <img
                                    src={profilePhoto}
                                    className="rounded-circle shadow"
                                    alt="User Image"
                                />
                                <p>
                                    Alexander Pierce - Web Developer
                                    <small>Member since Nov. 2023</small>
                                </p>
                            </li>
                            {/* <!--end::User Image--> */}

                            {/* <!--begin::Menu Footer--> */}
                            <li className="user-footer">
                                <a href="#" className="btn btn-default btn-flat">Profile</a>
                                <a href="#" className="btn btn-default btn-flat float-end">Sign out</a>
                            </li>
                            {/* <!--end::Menu Footer--> */}
                        </ul>
                    </li>
                    {/* <!--end::User Menu Dropdown--> */}
                </ul>
                {/* <!--end::End Navbar Links--> */}
            </div>
            {/* <!--end::Container--> */}
        </nav>
    )
}

export default TopBar
