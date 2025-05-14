import axios from 'axios';

const https = axios.create({
    baseURL: "http://localhost:3000/salons"
});

export class SalonApiServices {
    getUrlToSalon() {
        return https.get();
    }
}