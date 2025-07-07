import axios from 'axios';

const api = axios.create({
    baseURL: "https://utimebackendopen.azurewebsites.net/api/v1",
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("jwt_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default class SalonProfileApiService {
    async getProviderById(providerId) {
        return api.get(`/provider/${providerId}`);
    }

    async getServices() {
        return api.get(`/service`);
    }

    async getReviews() {
        return api.get(`/review`);
    }
}
