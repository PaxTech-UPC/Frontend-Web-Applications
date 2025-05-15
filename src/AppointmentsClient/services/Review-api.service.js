import axios from 'axios';
import { BaseApiService } from '../../shared/services/base.service.js';

const serviceApi = 'http://localhost:3000/reviews';

const http = axios.create({
    baseURL: serviceApi,
});

export class ReviewApiService extends BaseApiService {

    static getAll() {
        return http.get('/');
    }

    static create(review) {
        return http.post('/', review);
    }
}
