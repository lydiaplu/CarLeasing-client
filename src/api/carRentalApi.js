import { api, getHeader } from './apiConfig';

export async function addCarRental(carRental) {
    const response = await api.post("/rentals/add/new-rental", carRental)
    console.log("/rentals/add/new-rental: ", response);
    return response;
}

export async function editCarRental(carRentalId, carRental) {
    const response = await api.put(`/rentals/update/${carRentalId}`, carRental);
    console.log(`/rentals/update/${carRentalId}`, response);
    return response;
}

export async function getCarRentalById(carRentalId) {
    try {
        const result = await api.get(`/rentals/rental/${carRentalId}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function getAllCarRentals() {
    try {
        const result = await api.get("/rentals/all");
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function deleteCarRental(carRentalId) {
    try {
        const result = await api.delete(`/rentals/delete/${carRentalId}`)
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting car ${error.message}`);
    }
}

export async function getCarRentalsByCustomerId(customerId) {
    try {
        const result = await api.get(`/rentals/by-customer-id/${customerId}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function getCarRentalsByCarId(carId) {
    try {
        const result = await api.get(`/rentals/by-car-id/${carId}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}