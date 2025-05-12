import axios from 'axios';

const resApi  = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
    baseURL :resApi,
});

export class BaseApiService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    getAll() {
        return http.get(this.endpoint);
    }

}
