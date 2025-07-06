import axios from "axios";

const API_URL = "http://localhost:5245/api/v1/authentication";

export const signUp = (userData) => {
    return axios.post(`${API_URL}/sign-up`, userData)
        .then((res) => res.data); // 👈 devuelve el body { id, email }
};


export const signIn = (credentials) => {
    return axios.post(`${API_URL}/sign-in`, credentials).then((res) => {
        if (res.data.token) {
            localStorage.setItem("jwt_token", res.data.token);
            localStorage.setItem("user_id", res.data.id); // 👈 Guarda el id también
        }
        return res.data;
    });
};

export const getToken = () => {
    return localStorage.getItem("jwt_token");
};

export const logout = () => {
    localStorage.removeItem("jwt_token");
};
