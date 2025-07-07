import axios from 'axios';
import { getToken } from '../../iam/services/auth.services.js';

const PROVIDER_API_URL = 'http://localhost:5245/api/v1/provider';

const http = axios.create({
    baseURL: PROVIDER_API_URL,
    headers: { 'Content-Type': 'application/json' }
});

http.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const ProviderApiService = {
    getAllProviders() {
        return http.get('').then(res => res.data);
    }
};
