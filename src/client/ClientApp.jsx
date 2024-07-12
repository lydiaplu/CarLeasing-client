import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import NavBar from "./components/layout/NavBar.jsx"
import Home from "./components/home/Home.jsx"

// import './client-app.scss'
import "./scss/client-app.scss";

function ClientApp() {
    return (
        <div className="client">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    )
}

export default ClientApp
