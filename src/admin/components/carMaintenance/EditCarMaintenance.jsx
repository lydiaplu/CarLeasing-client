import React from 'react'

import { adminConfig } from '../../../config/adminConfig';
import { editCarMaintenance } from '../../../api/carMaintenanceApi';
import CarMaintenanceForm from './CarMaintenanceForm';

export default function EditCarMaintenance() {

    const onSubmit = async (carMaintenance, showMessage, clearForm) => {
        try {
            const success = await editCarMaintenance(carMaintenance.id, carMaintenance);

            if (success) {
                showMessage("edit successfully!", "info");
                clearForm();
            } else {
                showMessage("Error editing!", "danger");
            }
        } catch (error) {
            showMessage(error.message, "danger");
        }
    }

    return (
        <CarMaintenanceForm formState={adminConfig.formState.edit} onSubmit={onSubmit} />
    )
}
