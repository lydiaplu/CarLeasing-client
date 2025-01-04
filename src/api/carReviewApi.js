import { api, getHeader } from './apiConfig';

export async function addCarReview(carReview) {
    const response = await api.post("/reviews/add/new-review", carReview)
    console.log("/reviews/add/new-review: ", response);
    return response;
}

export async function editCarReview(carReviewId, carReview) {
    const response = await api.put(`/reviews/update/${carReviewId}`, carReview);
    console.log(`/reviews/update/${carReviewId}`, response);
    return response;
}

export async function getCarReviewById(carReviewId) {
    try {
        const result = await api.get(`/reviews/review/${carReviewId}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function getAllCarReviews() {
    try {
        const result = await api.get("/reviews/all");
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function deleteCarReview(carReviewId) {
    try {
        const result = await api.delete(`/reviews/delete/${carReviewId}`)
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting car ${error.message}`);
    }
}

export async function getCarReviewsByCustomerId(customerId) {
    try {
        const result = await api.get(`/reviews/by-customer-id/${customerId}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function getCarReviewsByCarId(carId) {
    try {
        const result = await api.get(`/reviews/by-car-id/${carId}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}

export async function getCarReviewByRentedId(rentedId) {
    try {
        const result = await api.get(`/reviews/by-rented-id/${rentedId}`);
        return result.data;

    } catch (error) {
        throw new Error(`Error fetching car ${error.message}`)
    }
}