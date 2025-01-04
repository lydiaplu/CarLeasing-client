import { api, getHeader } from './apiConfig';

export async function addRentedCar(rentedCar) {
    const response = await api.post("/rentals/add/new-rental", rentedCar)
    console.log("/rentals/add/new-rental: ", response);
    return response;
}

export async function editRentedCar(rentedId, rentedCar) {
    const response = await api.put(`/rentals/update/${rentedId}`, rentedCar);
    console.log(`/rentals/update/${rentedId}`, response);
    return response;
}

export async function getRentedCarById(rentedId) {
    try {
        const result = await api.get(`/rentals/rental/${rentedId}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function getAllRentedCars() {
    try {
        const result = await api.get("/rentals/all");
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function deleteRentedCar(rentedId) {
    try {
        const result = await api.delete(`/rentals/delete/${rentedId}`)
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting car ${error.message}`);
    }
}

export async function getRentedCarsByCustomerId(customerId) {
    try {
        const result = await api.get(`/rentals/by-customer-id/${customerId}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function getRentedCarsByCarId(carId) {
    try {
        const result = await api.get(`/rentals/by-car-id/${carId}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}