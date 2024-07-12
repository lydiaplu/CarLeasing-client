import React from 'react'

import { adminConfig } from '../../../config/adminConfig';
import { editCarViolation } from '../../../api/carViolationApi';
import CarViolationForm from './CarViolationForm'

export default function EditCarViolation() {

    const onSubmit = async (carViolation, showMessage, clearForm) => {
        try {
            const success = await editCarViolation(carViolation.id, carViolation);

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
        <CarViolationForm formState={adminConfig.formState.edit} onSubmit={onSubmit} />
    )
}