import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5245/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// Adjunta el token JWT automáticamente
api.interceptors.request.use(config => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export class ReservationApiService {
    async getClientByUserId(userId) {
        return api.get(`/client/by-user/${userId}`);
    }

    async createTimeSlot(timeSlot) {
        return api.post(`/time-slot`, timeSlot);
    }

    async createPayment(payment) {
        return api.post(`/payment`, payment);
    }

    async createReservation(reservation) {
        return api.post(`/reservation`, reservation);
    }

    async getWorkersByProvider(providerId) {
        return api.get(`/worker?providerId=${providerId}`);
    }

    async getTimeSlotsByWorker(workerId) {
        return api.get(`/time-slot?workerId=${workerId}`);
    }

    async getAllClients() {
        return api.get(`/client`);
    }

    async getAllReservations() {
        return api.get(`/reservation`);
    }

    async getAllTimeSlots() {
        return api.get(`/time-slot`);
    }

    async getReservationDetails(id) {
        return api.get(`/reservation/${id}/details`);
    }

    // 🚀 NUEVOS MÉTODOS
    async getTimeSlotById(timeSlotId) {
        return api.get(`/time-slot/${timeSlotId}`);
    }

    async getWorkerById(workerId) {
        return api.get(`/worker/${workerId}`);
    }

    async getProviderById(providerId) {
        return api.get(`/provider/${providerId}`);
    }

}
