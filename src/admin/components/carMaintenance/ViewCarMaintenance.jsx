import React from 'react'
import { adminConfig } from '../../../config/adminConfig'
import CarMaintenanceForm from './CarMaintenanceForm'

export default function ViewCarMaintenance() {
    return (
        <CarMaintenanceForm formState={adminConfig.formState.view} />
    )
}
