import axios from 'axios';
import { BaseApiService } from "../../shared/services/base.service.js";

const resApi = import.meta.env.VITE_API_BASE_URL;
const reservationEndpoint = import.meta.env.VITE_RESERVATIONS_ENDPOINT_PATH;

const http = axios.create({
    baseURL: `${resApi}${reservationEndpoint}`, // ✅ Usa la URL del backend real
    headers: {
        'Content-Type': 'application/json',
    },
});

export class ReservationApiService extends BaseApiService {
    constructor() {
        super(reservationEndpoint);
    }

    // ✅ Obtiene un cliente por su userId
    async getClientByUserId(userId) {
        return http.get(`/client/by-user/${userId}`);
    }

    // ✅ Crea un nuevo time slot
    async createTimeSlot(timeSlot) {
        return http.post(`/time-slot`, timeSlot);
    }

    // ✅ Crea una reserva
    async createReservation(reservation) {
        return http.post(`/reservation`, reservation);
    }

    // Hardcode (si todavía necesitas el fake API)
    static getAll() {
        return axios.get('https://fakeapi-yoil.onrender.com/api/reservationDetails');
    }
}
