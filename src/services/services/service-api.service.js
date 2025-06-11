import axios from 'axios';
import { BaseApiService } from '../../shared/services/base.service.js';

const serviceApi = 'http://localhost:3000/services';

const http = axios.create({
    baseURL: serviceApi,
});

export class ServiceApiService extends BaseApiService {

    static getAll() {
        return http.get('/');
    }

    static create(service) {
        return http.post('/', service);
    }

    static delete(id) {
        return http.delete(`/${id}`);
    }

    static update(id, service) {
        return http.put(`/${id}`, service);
    }
}
