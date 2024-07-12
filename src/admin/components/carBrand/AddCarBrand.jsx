import React from 'react'

import { resizeImage } from '../../../utils/resizeImage';
import { adminConfig } from '../../../config/adminConfig';
import { addCarBrand } from '../../../api/carBrandsApi';
import CarBrandForm from './CarBrandForm';

function AddCarBrand() {

    const onSubmit = async (carBrand, showMessage, clearForm) => {
        try {
            // Compress images before uploading
            try {
                const compressedImage = await resizeImage(carBrand.logo, 800, 600, 0.7);
                carBrand.logo = compressedImage;
            } catch (error) {
                console.error('Error compressing the image', error);
            }

            const success = await addCarBrand(carBrand);

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
        <CarBrandForm formState={adminConfig.formState.add} onSubmit={onSubmit} />
    )
}

export default AddCarBrand
