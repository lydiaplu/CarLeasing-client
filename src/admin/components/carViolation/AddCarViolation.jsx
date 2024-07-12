import React from 'react'

import { adminConfig } from '../../../config/adminConfig'
import { addCarViolation } from '../../../api/carViolationApi'
import CarViolationForm from './CarViolationForm'

export default function AddCarViolation() {

    const onSubmit = async (carViolation, showMessage, clearForm) => {
        try {
            const success = await addCarViolation(carViolation);

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
        <CarViolationForm formState={adminConfig.formState.add} onSubmit={onSubmit} />
    )
}
