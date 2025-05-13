import axios from 'axios';
import { BaseApiService } from '../../shared/services/base.service.js'; // Ajusta la ruta si está en otro lado

// Puedes cambiar esto por variables de entorno si las tienes configuradas
const serviceApi = 'http://localhost:3000/reservationDetails';

const http = axios.create({
    baseURL: serviceApi
});

export class AppointmentApiService extends BaseApiService {
    static getAll() {
        return http.get(''); // GET a /reservationDetails
    }
}
