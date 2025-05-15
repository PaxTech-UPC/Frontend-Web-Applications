import axios from 'axios';

const https = axios.create({
    baseURL: "http://localhost:3000/workers"
});

export class WorkerApiServices {
    getUrlToWorker() {
        return https.get();
    }
}