import axios from 'axios';
import { BaseApiService } from "../../shared/services/base.service.js";

const favApi = import.meta.env.VITE_API_BASE_URL;
const favoritesEndpoint = import.meta.env.VITE_FAVORITES_ENDPOINT_PATH;

const serviceApi = 'https://fakeapi-yoil.onrender.com/api/salons'
const http = axios.create({
    baseURL: serviceApi,
});

export class FavoritesApiService extends BaseApiService {

    constructor(favoritesEndpoint) {
        super(favoritesEndpoint);
    }

    static getSalons(){
        return http.get('');
    }
}

