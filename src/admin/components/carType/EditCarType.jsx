import React from 'react'

import CarTypeForm from './CarTypeForm';
import { adminConfig } from '../../../config/adminConfig';
import { editCarType } from '../../../api/carTypesApi';

export default function EditCarType() {

    const onSubmit = async (carType, showMessage, clearForm) => {
        try {
            const success = await editCarType(carType.id, carType);

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
        <CarTypeForm formState={adminConfig.formState.edit} onSubmit={onSubmit} />
    )
}
