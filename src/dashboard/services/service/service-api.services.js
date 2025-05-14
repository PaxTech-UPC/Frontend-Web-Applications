import axios from 'axios';

const https = axios.create({
    baseURL: "http://localhost:3000/services"
});

export class ServicesApi {
    getUrlToServices() {
        return https.get();
    }
}