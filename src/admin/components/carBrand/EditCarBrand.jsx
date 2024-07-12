import React from 'react'

import { resizeImage } from '../../../utils/resizeImage';
import { adminConfig } from '../../../config/adminConfig';
import { editCarBrand } from '../../../api/carBrandsApi'
import CarBrandForm from './CarBrandForm';

function EditCarBrand() {

    const onSubmit = async (carBrand, showMessage, clearForm) => {
        try {
            // Compress images before uploading
            try {
                const compressedImage = await resizeImage(carBrand.logo, 800, 600, 0.7);
                carBrand.logo = compressedImage;
            } catch (error) {
                console.error('Error compressing the image', error);
            }

            const success = await editCarBrand(carBrand.id, carBrand);

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
        <CarBrandForm formState={adminConfig.formState.edit} onSubmit={onSubmit}/>
    )
}

export default EditCarBrand
