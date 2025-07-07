import axios from 'axios';
import { ProfileClientAssembler } from "./ProfileClient.assembler.js";

const api = axios.create({
    baseURL: "https://utimebackendopen.azurewebsites.net/api/v1",
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("jwt_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export class ProfileClientService {
    async getProfile() {
        const userId = localStorage.getItem("user_id");
        try {
            const clientsResponse = await api.get(`/client`);
            const clients = clientsResponse.data;

            const client = clients.find(c => c.userId === parseInt(userId));
            if (!client) {
                throw new Error(`Cliente no encontrado para userId: ${userId}`);
            }

            const userResponse = await api.get(`/users/${userId}`);

            return ProfileClientAssembler.toEntityFromTwoResources(client, userResponse.data);
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
            throw error;
        }
    }

    // Los demás métodos igual
}
