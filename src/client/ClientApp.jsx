import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"

import NavBar from "./components/layout/navBar/NavBar.jsx"
import Home from "./components/home/Home.jsx"
import Resigter from "./components/auth/Register.jsx"
import ResetPassword from "./components/auth/ResetPassword.jsx"

// import './client-app.scss'
import "./scss/client-app.scss";
import Login from "./components/auth/Login.jsx";
import Profile from "./components/customer/Profile.jsx"
import CustomerLoader from "./features/customerLoader.jsx"
import BrowseAllCars from "./components/browseAllCars/BrowseAllCars.jsx"

function ClientApp() {
    const location = useLocation();
    const noNavBarPaths = ["/login", "/register", "/reset-password", "/profile"];

    return (
        <div className="client">
            <CustomerLoader />

            {!noNavBarPaths.includes(location.pathname) && <NavBar />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Resigter />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="profile/:customerId" element={<Profile />} />
                <Route path="browse-all-cars" element={<BrowseAllCars />} />
            </Routes>
        </div>
    )
}

export default ClientApp
