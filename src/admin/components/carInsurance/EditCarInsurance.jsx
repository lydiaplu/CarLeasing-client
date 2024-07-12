import React from 'react'

import { adminConfig } from '../../../config/adminConfig'
import { editCarInsurance } from '../../../api/carInsuranceApi'
import CarInsuranceForm from './CarInsuranceForm'

export default function EditCarInsurance() {

    const onSubmit = async (carInsurance, showMessage, clearForm) => {
        try {
            const success = await editCarInsurance(carInsurance.id, carInsurance);

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
        <CarInsuranceForm formState={adminConfig.formState.edit} onSubmit={onSubmit} />
    )
}
