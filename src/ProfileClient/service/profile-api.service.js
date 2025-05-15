import axios from 'axios';
import { ProfileClientAssembler } from "./ProfileClient.assembler.js";

export class ProfileClientService {
    constructor() {
        this.apiUrl = 'api/profile'; // Verifica que esta ruta funcione
    }

    async getProfile() {
        try {
            const response = await axios.get(this.apiUrl);
            return ProfileClientAssembler.toEntityFromResource(response.data);
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
            throw error;
        }
    }

    async updateProfile(profile) {
        try {
            const response = await axios.put(this.apiUrl, profile);
            return ProfileClientAssembler.toEntityFromResource(response.data);
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            throw error;
        }
    }

    async changePassword(currentPassword, newPassword) {
        try {
            const response = await axios.post(`${this.apiUrl}/change-password`, {
                currentPassword,
                newPassword
            });
            return response.data;
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            throw error;
        }
    }

    async logout() {
        try {
            const response = await axios.post(`${this.apiUrl}/logout`);
            return response.data;
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            throw error;
        }
    }

    async deleteAccount() {
        try {
            const response = await axios.delete(this.apiUrl);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar la cuenta:', error);
            throw error;
        }
    }
}
