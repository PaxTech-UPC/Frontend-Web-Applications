import axios from 'axios';
import { BaseApiService } from '../../shared/services/base.service.js';

const serviceApi = 'https://fakeapi-yoil.onrender.com/api/reviews';

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
