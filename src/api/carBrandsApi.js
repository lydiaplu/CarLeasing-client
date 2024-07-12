import { api, getHeader } from './apiConfig';

export async function addCarBrand({ brandName, country, foundedYear, logo }) {
    const formData = new FormData();
    formData.append("name", brandName);
    if (country)
        formData.append("country", country);
    if (foundedYear !== undefined && foundedYear !== null && foundedYear !== "")
        formData.append("foundedYear", foundedYear.toString());
    formData.append("logo", logo);

    const response = await api.post("/carbrands/add/new-carbrand", formData, {
        headers: { ...getHeader(), "Content-Type": "multipart/form-data" }
    })

    console.log("/carbrands/add/new-carbrand: ", response);

    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export async function editCarBrand(carBrandId, { brandName, country, foundedYear, logo }) {
    const formData = new FormData();
    formData.append("name", brandName);
    if (country)
        formData.append("country", country);
    if (foundedYear !== undefined && foundedYear !== null && foundedYear !== "")
        formData.append("foundedYear", foundedYear.toString());
    formData.append("logo", logo);

    const response = await api.put(`/carbrands/update/${carBrandId}`, formData, {
        headers: { ...getHeader(), "Content-Type": "multipart/form-data" }
    })

    console.log(`/carbrands/update/${carBrandId}`, response);

    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export async function getCarBrandById(carBrandId) {
    try {
        const result = await api.get(`/carbrands/carbrand/${carBrandId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching car brands ${error.message}`)
    }
}

export async function getAllCarBrands() {
    try {
        const result = await api.get("/carbrands/all");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching car brands")
    }
}

export async function deleteCarBrand(carBrandId) {
    try {
        const result = await api.delete(`/carbrands/delete/${carBrandId}`, {
            headers: getHeader()
        })

        return result.data;
    } catch (error) {
        throw new Error(`Error deleting car brand ${error.message}`);
    }
}

export async function getAllCountries() {
    try {
        const response = await api.get("/carbrands/all-countries")
        return response.data;
    } catch (error) {
        throw new Error("Error fetching car brand's countries")
    }
}

export async function getAllCountriesOptions() {
    try {
        const response = await api.get("/carbrands/all-countries")
        return response.data.map(item => ({ id: item, value: item }));
    } catch (error) {
        throw new Error("Error fetching car brand's countries")
    }
}

export async function getAllCarBrandsOptions() {
    try {
        const result = await api.get("/carbrands/all");
        console.log("getAllCarBrandsOptions: ", result.data)
        return result.data.map(item => ({ id: item.id, value: item.name }));
    } catch (error) {
        throw new Error("Error fetching car brands")
    }
}