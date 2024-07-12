import React from 'react'

import CarTypeForm from './CarTypeForm'
import { adminConfig } from '../../../config/adminConfig';
import { addCarType } from '../../../api/carTypesApi';

export default function AddCarType() {

    const onSubmit = async (carType, showMessage, clearForm) => {
        try {
            const success = await addCarType(carType);

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
        <CarTypeForm formState={adminConfig.formState.add} onSubmit={onSubmit} />
    )
}
