import React from 'react'

import { adminConfig } from '../../../config/adminConfig'
import CarRentalForm from './CarRentalForm'

export default function ViewCarRental() {
    return (
        <CarRentalForm formState={adminConfig.formState.view} />
    )
}
