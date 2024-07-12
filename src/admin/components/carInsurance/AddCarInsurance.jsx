import React from 'react'

import { adminConfig } from '../../../config/adminConfig';
import { addCarInsurance } from '../../../api/carInsuranceApi';
import CarInsuranceForm from './CarInsuranceForm';

export default function AddCarInsurance() {
    const onSubmit = async (carInsurance, showMessage, clearForm) => {
        try {
            const success = await addCarInsurance(carInsurance);

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
        <CarInsuranceForm formState={adminConfig.formState.add} onSubmit={onSubmit} />
    )
}
