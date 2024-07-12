import React from 'react'
import CarInsuranceForm from './CarInsuranceForm'
import { adminConfig } from '../../../config/adminConfig'

export default function ViewCarInsurance() {
    return (
        <CarInsuranceForm formState={adminConfig.formState.view} />
    )
}
