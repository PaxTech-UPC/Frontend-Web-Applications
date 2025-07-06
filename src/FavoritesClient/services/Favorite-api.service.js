import axios from 'axios';

const https = axios.create({
    baseURL: "http://localhost:5245/api/v1/provider"
});

// ✅ Interceptor para JWT
https.interceptors.request.use(
    config => {
        const token = localStorage.getItem("jwt_token"); // tu JWT
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export class FavoritesApiService {
    static getProviders() {
        return https.get();
    }
}
