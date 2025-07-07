import axios from 'axios';
import { getToken } from '../../iam/services/auth.services.js'; // 👈 Importa el token desde auth.services.js

const API_URL = 'http://localhost:5245/api/v1/service';

// Crea instancia de Axios para este servicio
const http = axios.create({
    baseURL: API_URL
});

// Interceptor para agregar token JWT en cada solicitud
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

// Exporta los métodos del servicio
export const ServiceApiService = {
    // Crear nuevo servicio
    create(serviceData) {
        return http.post('', serviceData).then((res) => res.data);
    },

    // Obtener todos los servicios
    getAll() {
        return http.get('').then((res) => res.data);
    },

    // Obtener servicio por ID
    getById(id) {
        return http.get(`/${id}`).then((res) => res.data);
    },

    // Actualizar un servicio existente
    update(id, updatedData) {
        return http.put(`/${id}`, updatedData).then((res) => res.data);
    },

    // Eliminar un servicio por ID
    delete(id) {
        return http.delete(`/${id}`).then((res) => res.data);
    }
};
