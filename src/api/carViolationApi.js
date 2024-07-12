import { api, getHeader } from './apiConfig';

export async function addCarViolation(carViolation) {
    const response = await api.post("/violations/add/new-violation", carViolation);
    console.log("/violations/add/new-violation", response);
    return response;
}

export async function editCarViolation(carViolationId, carViolation) {
    const response = await api.put(`/violations/update/${carViolationId}`, carViolation);
    console.log(`/violations/update/${carViolation}`, response);
    return response;
}

export async function getCarViolationById(carViolationId) {
    try {
        const result = await api.get(`/violations/violation/${carViolationId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching car violation ${error.message}`)
    }
}

export async function getAllCarViolations() {
    try {
        const result = await api.get("/violations/all");
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching car violation ${error.message}`)
    }
}

export async function deleteCarViolation(carViolationId) {
    try {
        const result = await api.delete(`/violations/delete/${carViolationId}`)
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting car violation ${error.message}`)
    }
}