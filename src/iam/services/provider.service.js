import axios from "axios";
import { getToken } from "./auth.services.js";

const API_URL = "http://localhost:5245/api/v1/provider";

export const createProvider = (providerData) => {
    return axios.post(API_URL, providerData);
};

export const getProviderByUserId = async (userId) => {
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
export const getAllProviders = async () => {
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
};