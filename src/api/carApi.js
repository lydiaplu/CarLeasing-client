import { api, getHeader } from './apiConfig';

export async function addCar(car) {
    const response = await api.post("/cars/add/new-car", car)
    console.log("/cars/add/new-car: ", response);
    return response;
}

export async function editCar(carId, car) {
    const response = await api.put(`/cars/update/${carId}`, car);
    console.log(`/cars/update/${carId}`, response);
    return response;
}

export async function getCarById(carId) {
    try {
        const result = await api.get(`/cars/car/${carId}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function getAllCars() {
    try {
        const result = await api.get("/cars/all");
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function getAllCarsByGroup() {
    try {
        const result = await api.get("/cars/all-by-group");
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching car by group ${error.message}`)
    }
}

export async function getDistinctCarByEveryType() {
    try {
        const result = await api.get("/cars/distinct-by-every-type");
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching car by group ${error.message}`)
    }
}

export async function getCarByCheckInOutDataAndFuletypeBrandModelType(searchInput) {
    try {
        const filterParams = Object.keys(searchInput).reduce((acc, key) => {
            if (searchInput[key] !== "") {
                acc[key] = searchInput[key];
            }
            return acc;
        }, {});

        const params = new URLSearchParams(filterParams).toString();
        const result = await api.get(`/cars/all-by-checkinout-fueltype-brand-model-type?${params}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car by group ${error.message}`)
    }
}

export async function getCarByTypeAndBrand(searchInput) {
    try {
        console.log("getCarByTypeAndBrand: ", searchInput);

        const filterParams = Object.keys(searchInput).reduce((acc, key) => {
            if (searchInput[key] !== "") {
                acc[key] = searchInput[key];
            }
            return acc;
        }, {});

        const params = new URLSearchParams(filterParams).toString();
        const result = await api.get(`/cars/all-by-type-brand?${params}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car by group ${error.message}`)
    }
}

export async function getCarByPopularRented(size = 20) {
    try {
        const result = await api.get(`/cars/popular-rented?page=0&size=${size}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching ${error.message}`)
    }
}

export async function getNewestCar(size = 20) {
    try {
        const result = await api.get(`/cars/newest-cars?page=0&size=${size}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching ${error.message}`)
    }
}

export async function deleteCar(carId) {
    try {
        const result = await api.delete(`/cars/delete/${carId}`)
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting car ${error.message}`);
    }
}

export async function getAllCarLicensePlate() {
    try {
        const result = await api.get("/cars/car/licenseplate/all");
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function getCarByLicensePlate(carLicensePlate) {
    try {
        const result = await api.get(`/cars/car/licenseplate/${carLicensePlate}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function getAllModelOptions() {
    try {
        const result = await api.get("/cars/all-models");
        console.log("getAllModelOptions: ", result.data)
        return result.data.map(item => ({ id: item, value: item }));
    } catch (error) {
        throw new Error("Error fetching car brands")
    }
}

export async function getAllAvailableOptions() {
    try {
        const result = await api.get("/cars/all-available");
        console.log("getAllAvailableOptions: ", result.data)
        return result.data.map(item => ({ id: item, value: item === "true" ? "Yes" : "No" }));
    } catch (error) {
        throw new Error("Error fetching car available")
    }
}

export async function getAllFuelTypeOptions() {
    try {
        const result = await api.get("/cars/all-fueltype");
        console.log("getAllFuelTypeOptions: ", result.data)
        return result.data.map(item => ({ id: item, value: item }));
    } catch (error) {
        throw new Error("Error fetching car fueltype")
    }
}