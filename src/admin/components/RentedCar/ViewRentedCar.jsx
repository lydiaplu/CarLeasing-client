import React from 'react'
import { adminConfig } from '../../../config/adminConfig'
import RentedCarForm from './RentedCarForm'

export default function ViewRentedCar() {
    return (
        <RentedCarForm formState={adminConfig.formState.view} />
    )
}
