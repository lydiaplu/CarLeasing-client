import { api, getHeader } from './apiConfig';

export async function registerUser(loginRequest) {
    const response = await api.post("/auth/register-user", loginRequest);
    console.log("/auth/register-user: ", response);
    return response;
}

export async function authenticateUser(userInfo) {
    const formData = new FormData();
    formData.append("usernameOrEmail", userInfo.usernameOrEmail);
    formData.append("password", userInfo.password);

    const response = await api.post("/users/login", formData, {
        headers: { ...getHeader(), "Content-Type": "multipart/form-data" }
    })

    console.log("/users/login: ", response);

    if (response.status === 200) {
        return response.data;
    } else {
        return false;
    }
}