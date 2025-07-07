import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5245/api/v1",
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export class ReservationApiService {
    async getAllProviders() {
        return api.get("/provider");
    }

    async getAllReservations() {
        return api.get("/reservation");
    }

    async getTimeSlotById(timeSlotId) {
        return api.get(`/time-slot/${timeSlotId}`);
    }

    async getWorkerById(workerId) {
        return api.get(`/worker/${workerId}`);
    }

    async getClientById(clientId) {
        return api.get(`/client/${clientId}`);
    }
}
