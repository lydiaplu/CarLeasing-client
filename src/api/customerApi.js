import { api, getHeader } from './apiConfig';

export async function registerCustomer(email, password) {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const response = await api.post("/customers/register", formData, {
        headers: { ...getHeader(), "Content-Type": "multipart/form-data" }
    });

    console.log("/customers/register", response);
    return response;
}

export async function signinCustomer(email, password) {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const response = await api.post("/customers/login", formData, {
        headers: { ...getHeader(), "Content-Type": "multipart/form-data" }
    });

    console.log("/customers/login: ", response);
    if (response.status === 200) {
        return response;
    } else {
        return false;
    }
}

export async function addCustomer(customer) {
    const response = await api.post("/customers/add/new-customer", customer);
    console.log("/customers/add/new-customer: ", response);
    return response;
}

export async function editCustomer(customerId, customer) {
    const response = await api.put(`/customers/update/${customerId}`, customer);
    console.log(`/customer/update/${customerId} `, response);
    return response;
}

export async function updateDriverLicensePhotos(customerId, driverLicenseFrontPhoto, driverLicenseBackPhoto) {
    const formData = new FormData();
    driverLicenseFrontPhoto && formData.append("driverLicenseFrontPhoto", driverLicenseFrontPhoto);
    driverLicenseFrontPhoto && formData.append("driverLicenseBackPhoto", driverLicenseBackPhoto);

    const response = await api.put(`/customers/upload/driver-license-photos/${customerId}`, formData, {
        headers: { ...getHeader(), "Content-Type": "multipart/form-data" }
    })

    console.log(`/customers/upload/driver-license-photos/${customerId}`, response);
    return response;
}

export async function getCustomerById(customerId) {
    try {
        const result = await api.get(`/customers/customer/${customerId}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function getCustomerByEmail(email) {
    try {
        const endoceEmail = encodeURIComponent(email);
        const result = await api.get(`/customers/customer-email/${endoceEmail}`);
        console.log(`/customers/customer/${endoceEmail}`, result);

        return result.data;
    } catch (error) {
        throw new Error(`Error fetching ${error.message}`)
    }
}

export async function getByDriverLicenseNumber(driverLicenseNumber) {
    try {
        const result = await api.get(`/customers/customer-driverlicensenumber/${driverLicenseNumber}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching ${error.message}`)
    }
}

export async function getAllCustomers() {
    try {
        const result = await api.get("/customers/all");
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function deleteCustomer(customerId) {
    try {
        const result = await api.delete(`/customers/delete/${customerId}`)
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting customer ${error.message}`);
    }
}