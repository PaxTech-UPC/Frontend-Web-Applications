import axios from 'axios';

const https = axios.create({
    baseURL: "http://localhost:3000/reviews"
});

export class reviewApiServices {
    getUrlToReview() {
        return https.get();
    }
}