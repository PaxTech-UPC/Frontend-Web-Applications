import axios from 'axios';
import { BaseApiService } from "../../shared/services/base.service.js";

const resApi = import.meta.env.VITE_API_BASE_URL;
const reservationEndpoint = import.meta.env.VITE_RESERVATIONS_ENDPOINT_PATH;

// HardCode
const serviceApi = 'http://localhost:3000/workers'

const http = axios.create({
    baseURL: serviceApi,
});

export class FavoritesApiService extends BaseApiService {

    constructor(reservationEndpoint) {
        super(reservationEndpoint);
    }


    //HardCode
    static getAll(){
        return http.get('');
    }
}

