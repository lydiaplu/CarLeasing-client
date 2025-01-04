import React from 'react'

import { resizeImage } from '../../../utils/resizeImage';
import { adminConfig } from '../../../config/adminConfig';
import { editCustomer, updateDriverLicensePhotos } from '../../../api/customerApi';

import CustomerForm from './CustomerForm';

export default function EditCustomer() {
    const onSubmit = async (customer, showMessage, clearForm) => {
        try {
            const result = await editCustomer(customer.id, customer);

            if (result.status === 200) {
                // save pictures after add information. I did not find better way.
                try {
                    customer.driverLicenseFrontPhoto = customer.driverLicenseFrontPhoto && await resizeImage(customer.driverLicenseFrontPhoto, 800, 600, 0.7);
                    customer.driverLicenseBackPhoto = customer.driverLicenseBackPhoto && await resizeImage(customer.driverLicenseBackPhoto, 800, 600, 0.7);
                } catch (error) {
                    console.error('Error compressing the image', error);
                }

                await updateDriverLicensePhotos(result.data.id, customer.driverLicenseFrontPhoto, customer.driverLicenseBackPhoto);

                showMessage("edit successfully!", "info");
                clearForm();

            } else {
                showMessage("Error adding!", "danger");
            }

        } catch (error) {
            showMessage(error.message, "danger");
        }
    }

    return (
        <CustomerForm formState={adminConfig.formState.edit} onSubmit={onSubmit} />
    )
}
