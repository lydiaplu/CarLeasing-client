import { api, getHeader } from './apiConfig';

export async function addCarType({ typeName }) {
    const formData = new FormData();
    formData.append("typeName", typeName);

    const response = await api.post("/cartypes/add/new-cartype", formData, {
        headers: { ...getHeader(), "Content-Type": "multipart/form-data" }
    })

    console.log("/cartypes/add/new-cartype", response);

    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export async function editCarType(carTypeId, { typeName }) {
    const formData = new FormData();
    formData.append("typeName", typeName);

    const response = await api.put(`/cartypes/update/${carTypeId}`, formData, {
        headers: { ...getHeader(), "Content-Type": "multipart/form-data" }
    })

    console.log(`/cartypes/update/${carTypeId}`, response);

    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export async function getCarTypeById(carTypeId) {
    try {
        const result = await api.get(`/cartypes/cartype/${carTypeId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}

export async function getAllCarTypes() {
    try {
        const result = await api.get("/cartypes/all");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching car types")
    }
}

export async function deleteCarType(carTypeId) {
    try {
        const result = await api.delete(`/cartypes/delete/${carTypeId}`, {
            headers: getHeader()
        })

        return result.data;
    } catch (error) {
        throw new Error(`Error deleting car type ${error.message}`);
    }
}

export async function getAllCarTypesOptions() {
    try {
        const result = await api.get("/cartypes/all");
        console.log("getAllCarTypesOptions: ", result.data)
        return result.data.map(item => ({ id: item.id, value: item.typeName }));
    } catch (error) {
        throw new Error("Error fetching car brands")
    }
}