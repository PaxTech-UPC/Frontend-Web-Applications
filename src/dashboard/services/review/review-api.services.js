import axios from 'axios';

const https = axios.create({
    baseURL: "https://utimebackendopen.azurewebsites.net/api/v1/reviews"
});

export class reviewApiServices {
    getUrlToReview() {
        return https.get();
    }
}