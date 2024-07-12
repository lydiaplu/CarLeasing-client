import { api, getHeader } from './apiConfig';

export async function addCarInsurance(carInsurance) {
    const response = await api.post("/insurances/add/new-insurance", carInsurance);
    console.log("/insurances/add/new-insurance", response);
    return response;
}

export async function editCarInsurance(carInsuranceId, carInsurance) {
    const response = await api.put(`/insurances/update/${carInsuranceId}`, carInsurance);
    console.log(`/insurances/update/${carInsuranceId}`, response);
    return response;
}

export async function getCarInsuranceById(carInsuranceId) {
    try {
        const result = await api.get(`/insurances/insurance/${carInsuranceId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching car insurance ${error.message}`)
    }
}

export async function getAllCarInsurances() {
    try {
        const result = await api.get("/insurances/all");
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching car insurance ${error.message}`)
    }
}

export async function deleteCarInsurance(carInsuranceId) {
    try {
        const result = await api.delete(`/insurances/delete/${carInsuranceId}`)
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting car insurance ${error.message}`);
    }
}