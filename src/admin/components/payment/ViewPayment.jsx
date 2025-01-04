import React from 'react'
import { adminConfig } from '../../../config/adminConfig'
import PaymentForm from './PaymentForm'

export default function ViewPayment() {
    return (
        <PaymentForm formState={adminConfig.formState.view} />
    )
}
