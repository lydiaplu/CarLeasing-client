import React from 'react'
import { adminConfig } from '../../../config/adminConfig'
import CustomerForm from './CustomerForm'

export default function ViewCustomer() {
    return (
        <CustomerForm formState={adminConfig.formState.view} />
    )
}
