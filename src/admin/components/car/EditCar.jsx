import React from 'react'

import { resizeImage } from '../../../utils/resizeImage';
import { adminConfig } from '../../../config/adminConfig';
import { editCar } from '../../../api/carApi'
import { addCarPicture, deleteCarPicture } from '../../../api/carPictureApi';
import CarForm from './CarForm'

export default function EditCar() {
    
    const onSubmit = async (car, pictures, showMessage, clearForm) => {
        try {
            const result = await editCar(car.id, car);

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
                        // add picture
                        await addCarPicture(result.data.id, picture);

                    } else if (picture.operation === "delete" && picture.id !== null) {
                        // delete picture
                        await deleteCarPicture(result.data.id, picture.id);
                    }
                }

                showMessage("edit successfully!", "info");
                // clearForm();
            } else {
                showMessage("Error editing!", "danger");
            }
        } catch (error) {
            showMessage(error.message, "danger");
        }
    }

    return (
        <CarForm formState={adminConfig.formState.edit} onSubmit={onSubmit} />
    )
}
