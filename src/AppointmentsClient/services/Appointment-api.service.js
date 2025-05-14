import axios from 'axios';
import { BaseApiService } from '../../shared/services/base.service.js'; // Ajusta la ruta si está en otro lado

const serviceApi = 'http://localhost:3000/reservationDetails';

const http = axios.create({
    baseURL: serviceApi
});

export class AppointmentApiService extends BaseApiService {
    static getAppointments() {
        return http.get('');
    }
}
