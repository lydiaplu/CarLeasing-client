import React from 'react'

import { adminConfig } from '../../../config/adminConfig';
import { addCarMaintenance } from '../../../api/carMaintenanceApi';
import CarMaintenanceForm from './CarMaintenanceForm';

export default function AddCarMaintenance() {

    const onSubmit = async (carMaintenance, showMessage, clearForm) => {
        try {
            const success = await addCarMaintenance(carMaintenance);

            if (success) {
                showMessage("added successfully!", "info");
                clearForm();
            } else {
                showMessage("Error adding!", "danger");
            }
        } catch (error) {
            showMessage(error.message, "danger");
        }
    }
    
    return (
        <CarMaintenanceForm formState={adminConfig.formState.add} onSubmit={onSubmit} />
    )
}
