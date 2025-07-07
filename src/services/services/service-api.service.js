import axios from 'axios';
import { getToken } from '../../iam/services/auth.services.js'; // ✅ token para autenticación

const SERVICE_API_URL = 'https://utimebackendopen.azurewebsites.net/api/v1/service';
const PROVIDER_API_URL = 'https://utimebackendopen.azurewebsites.net/api/v1/provider';

// Axios para servicios
const http = axios.create({
    baseURL: SERVICE_API_URL,
    headers: { 'Content-Type': 'application/json' }
});

// Axios para providers
const providerHttp = axios.create({
    baseURL: PROVIDER_API_URL,
    headers: { 'Content-Type': 'application/json' }
});

// ✅ Agrega el token a cada request
http.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

providerHttp.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

// Métodos del servicio
export const ServiceApiService = {
    // 🔥 Servicios
    create(service) {
        return http.post('', service).then(res => res.data);
    },
    getAll() {
        return http.get('').then(res => res.data);
    },
    getById(id) {
        return http.get(`/${id}`).then(res => res.data);
    },
    update(id, service) {
        return http.put(`/${id}`, service).then(res => res.data);
    },
    delete(id) {
        return http.delete(`/${id}`).then(res => res.data);
    },

    // 🔥 Providers
    getAllProviders() {
        return providerHttp.get('').then(res => res.data);
    }
};
