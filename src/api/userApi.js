import { api, getHeader } from './apiConfig';

export async function getUsers() {
    try {
        const result = await api.get(`/users/all`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching ${error.message}`)
    }
}

export async function getUserByEmail(email) {
    try {
        const result = await api.get(`/users/user/${email}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching ${error.message}`)
    }
}

export async function deleteUser(email) {
    try {
        const result = await api.delete(`/users/delete/${email}`, {
            headers: getHeader()
        });
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting user fetching ${error.message}`)
    }
}