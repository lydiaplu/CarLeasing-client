import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import 'bootstrap-icons/font/bootstrap-icons.css';

import ClientApp from './client/ClientApp'
import AdminApp from './admin/AdminApp'

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<ClientApp />} />
            <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
    </Router>
  )
}

export default App
