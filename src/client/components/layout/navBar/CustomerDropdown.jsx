import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export default function CustomerDropdown({ currentCustomer }) {
    return (
        <div className='customer-dropdown-container'>
            <ul>
                <li>
                    <p className='dropdown-item user-name'>
                        <i className='icon'><FaRegUserCircle /></i>
                        {`${currentCustomer?.firstName || ''} ${currentCustomer?.middleName || ''} ${currentCustomer?.lastName || ''}`}
                    </p>
                </li>
                <li>
                    <Link className='dropdown-item user-email' to={`/profile/${currentCustomer.customerId}`}>
                        <i className='icon'><MdOutlineEmail /></i>
                        {currentCustomer.email}
                    </Link>
                </li>
            </ul>
        </div>
    )
}
