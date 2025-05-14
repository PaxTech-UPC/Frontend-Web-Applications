import axios from 'axios';

const https = axios.create({
    baseURL: "http://localhost:3000/salonProfiles"
});

export class SalonProfileApiServices {
    getUrlToSalonProfile() {
        return https.get();
    }

    async getSalonProfileById(salonId) {
        try {
            const response = await https.get(`?salonId=${salonId}`);
            return response.data[0]; // asumimos que es único
        } catch (error) {
            console.error('Error al obtener el perfil del salón:', error);
            throw error;
        }
    }
}