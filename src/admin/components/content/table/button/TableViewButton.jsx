import React from 'react'
import { Link } from 'react-router-dom'

export default function TableViewButton({ link }) {
  return (
    <span className="me-2">
      <Link className="btn btn-secondary btn-sm" to={link}>
        <i className="bi bi-eye-fill"></i>
      </Link>

    </span>
  )
}
