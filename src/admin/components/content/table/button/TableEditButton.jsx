import React from 'react'
import { Link } from 'react-router-dom'

function TableEditButton({ link }) {
    return (
        <span className="me-2">
            <Link className="btn btn-primary btn-sm" to={link}>
                <i className="bi bi-pencil-square"></i>
            </Link>
        </span>
    )
}

export default TableEditButton
