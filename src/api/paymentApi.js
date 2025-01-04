import { api, getHeader } from './apiConfig';

export async function addPayment(payment) {
    const response = await api.post("/payments/add/new-payment", payment)
    console.log("/payments/add/new-payment: ", response);
    return response;
}

export async function editPayment(paymentId, payment) {
    const response = await api.put(`/payments/update/${paymentId}`, payment);
    console.log(`/payments/update/${paymentId}`, response);
    return response;
}

export async function getPaymentById(paymentId) {
    try {
        const result = await api.get(`/payments/payment/${paymentId}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function getAllPayments() {
    try {
        const result = await api.get("/payments/all");
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function deletePayment(paymentId) {
    try {
        const result = await api.delete(`/payments/delete/${paymentId}`)
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting car ${error.message}`);
    }
}

export async function getPaymentsByCustomerId(customerId) {
    try {
        const result = await api.get(`/payments/by-customer-id/${customerId}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function getPaymentsByRentedId(rentalId) {
    try {
        const result = await api.get(`/payments/by-rented-id/${rentedId}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}