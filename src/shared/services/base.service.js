import axios from 'axios';

const resApi  = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
    baseURL :resApi,
});

export class BaseApiService {
    constructor(reservationEndpoint) {
        this.reservationEndpoint = reservationEndpoint;
    }

    getAll(params = {}) {
        return http.get(this.reservationEndpoint, { params });
    }

}
