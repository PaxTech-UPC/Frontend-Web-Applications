import axios from 'axios';

const https = axios.create({
    baseURL: "https://fakeapi-yoil.onrender.com/api/salons"
});

export class SalonApiServices {
    getUrlToSalon() {
        return https.get();
    }
}