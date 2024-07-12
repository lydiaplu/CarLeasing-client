import { api, getHeader } from './apiConfig';

export async function addCarPicture(carId, carPicture) {
    const formData = new FormData();
    formData.append("picture", carPicture.picture);

    const result = await api.post(`/carpictures/add/new-carpicture/${carId}`, formData, {
        headers: { ...getHeader(), "Content-Type": "multipart/form-data" }
    });

    console.log(`/carpictures/add/new-carpicture/${carId}`, result);
    return result;
}

export async function deleteCarPicture(carId, carPictureId) {
    try {
        const result = await api.delete(`/carpictures/delete/${carPictureId}?carId=${carId}`, {
            headers: getHeader()
        })

        return result.data;
    } catch (error) {
        throw new Error(`Error deleting car picture ${error.message}`);
    }
}

export async function getCarPicturesByCarId(carId) {
    

}