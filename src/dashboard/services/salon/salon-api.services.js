import axios from 'axios';

const https = axios.create({
    baseURL: "https://utimebackendopen.azurewebsites.net/api/v1/provider"
});

https.interceptors.request.use(
    config => {
        const token = localStorage.getItem("jwt_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export class SalonApiServices {
    getAllProviders() {
        return https.get();
    }
}
