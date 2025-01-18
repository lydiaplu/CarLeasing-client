import React from 'react'
import { useDispatch } from 'react-redux';
import { logoutCustomer } from '../../../features/customerSlice';
import { removeCustomerFromLocal } from '../../../features/customerStorage';
import { MdLogout } from "react-icons/md";

function LogoutDropdown() {
  const dispatch = useDispatch();

  const LogoutHandle = () => {
    removeCustomerFromLocal();
    dispatch(logoutCustomer());
  }

  return (
    <div className='logout-dropdown-container'>
      <div className=' dropdown-item'>
        <i className='icon'><MdLogout /></i>
        <a className='logoutBut' onClick={LogoutHandle}>Logout</a>
      </div>
    </div>
  )
}

export default LogoutDropdown
