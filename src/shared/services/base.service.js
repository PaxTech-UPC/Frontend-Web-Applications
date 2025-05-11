import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
    baseURL,
});

export class BaseApiService {
    constructor(endpointPath) {
        this.endpoint = endpointPath;
    }

    getAll(params = {}) {
        return http.get(this.endpoint, { params });
    }

    getById(id) {
        return http.get(`${this.endpoint}/${id}`);
    }

    create(data) {
        return http.post(this.endpoint, data);
    }

    update(id, data) {
        return http.put(`${this.endpoint}/${id}`, data);
    }

    delete(id) {
        return http.delete(`${this.endpoint}/${id}`);
    }
}
