import axios from 'axios';
import {ProfileClientAssembler} from "./ProfileClient.assembler.js";

export class ProfileClientService {
    constructor() {
        this.apiUrl = 'api/profile'; // Asegúrate que esta ruta sea la correcta
    }

    /**
     * Obtener información del perfil del cliente
     */
    async getProfile() {
        try {
            const response = await axios.get(this.apiUrl);
            return ProfileClientAssembler.toEntityFromResource(response.data);
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
            throw error;
        }
    }

    /**
     * Actualizar perfil del cliente
     */
    async updateProfile(profile) {
        try {
            const response = await axios.put(this.apiUrl, profile);
            return ProfileClientAssembler.toEntityFromResource(response.data);
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            throw error;
        }
    }

    /**
     * Cambiar contraseña del usuario
     */
    async changePassword(currentPassword, newPassword) {
        try {
            const response = await axios.post(`${this.apiUrl}/change-password`, {
                currentPassword,
                newPassword
            });
            return response.data; // true o false
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            throw error;
        }
    }

    /**
     * Cerrar sesión
     */
    async logout() {
        try {
            const response = await axios.post(`${this.apiUrl}/logout`);
            return response.data; // true o false
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            throw error;
        }
    }

    /**
     * Eliminar cuenta de usuario
     */
    async deleteAccount() {
        try {
            const response = await axios.delete(this.apiUrl);
            return response.data; // true o false
        } catch (error) {
            console.error('Error al eliminar la cuenta:', error);
            throw error;
        }
    }
}
