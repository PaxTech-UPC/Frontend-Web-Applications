import axios from 'axios';

const api = axios.create({
    baseURL: "https://utimebackendopen.azurewebsites.net/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// Adjunta token JWT
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export class AppointmentApiService {
    static async getAllReservations() {
        return api.get("/reservation");
    }

    static async getTimeSlotById(timeSlotId) {
        return api.get(`/time-slot/${timeSlotId}`);
    }

    static async getProviderById(providerId) {
        return api.get(`/provider/${providerId}`);
    }

    static async getPaymentById(paymentId) {
        return api.get(`/payment/${paymentId}`);
    }

    static async getWorkerById(workerId) {
        return api.get(`/worker/${workerId}`);
    }

    static async getAllClients() {
        return api.get("/client");
    }

}
