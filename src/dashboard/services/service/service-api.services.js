import axios from 'axios';

const https = axios.create({
    baseURL: "https://fakeapi-yoil.onrender.com/api/services"
});

export class ServicesApi {
    getUrlToServices() {
        return https.get();
    }
}