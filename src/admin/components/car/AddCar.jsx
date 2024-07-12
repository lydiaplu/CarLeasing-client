import React from 'react'

import { resizeImage } from '../../../utils/resizeImage';
import { adminConfig } from '../../../config/adminConfig';
import { addCar } from '../../../api/carApi'
import { addCarPicture } from '../../../api/carPictureApi';
import CarForm from './CarForm'


function AddCar() {
    const onSubmit = async (car, pictures, showMessage, clearForm) => {
        try {
            const result = await addCar(car);

            if (result.status === 200) {
                // save pictures one by one. I did not find better way.
                for (const picture of pictures) {
                    // there is operation to identity it is add or remove
                    if (picture.operation === "add") {
                        // Compress images before uploading
                        try {
                            const compressedImage = await resizeImage(picture.picture, 800, 600, 0.7);
                            picture.picture = compressedImage;
                        } catch (error) {
                            console.error('Error compressing the image', error);
                        }
                        await addCarPicture(result.data.id, picture);
                    }
                }

                showMessage("added successfully!", "info");
                // clearForm();

            } else {
                showMessage("Error adding!", "danger");
            }

        } catch (error) {
            showMessage(error.message, "danger");
        }
    }

    return (
        <CarForm formState={adminConfig.formState.add} onSubmit={onSubmit} />
    )
}

export default AddCar
