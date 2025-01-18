import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCustomerFromLocal } from './customerStorage';
import { setCustomer } from './customerSlice';

export default function CustomerLoader() {
    const dispatch = useDispatch();

    useEffect(() => {
        const currentCustomer = getCustomerFromLocal();
        if (currentCustomer) {
            dispatch(setCustomer(currentCustomer));
        }
    }, [dispatch])


    return null;
}
