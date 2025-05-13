import axios from 'axios';
import { BaseApiService } from '../../shared/services/base.service.js';

const serviceApi = 'http://localhost:3000/reviews'; // Puedes reemplazar por resApi si deseas usar variables de entorno

const http = axios.create({
    baseURL: serviceApi,
});

export class ReviewApiService extends BaseApiService {
    // Obtener todas las reseñas
    static getAll() {
        return http.get('/');
    }

    // Crear una nueva reseña
    static create(review) {
        return http.post('/', review);
    }
}
