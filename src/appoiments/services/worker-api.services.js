import axios from 'axios';

const https = axios.create({
    baseURL: "https://fakeapi-yoil.onrender.com/api/workers"
});

export class WorkerApiServices {
    getUrlToWorker() {
        return https.get();
    }
}