import axios from "axios";
import { getToken } from "./auth.services.js";

const API_URL = "http://localhost:5245/api/v1/client";

export const createClient = (clientData) => {
    return axios.post(API_URL, clientData); // 👈 sin header Authorization
};

export const getClientByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null; // No encontrado
        }
        throw error;
    }
};

// Nuevo método
export const getAllClients = async () => {
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
};
