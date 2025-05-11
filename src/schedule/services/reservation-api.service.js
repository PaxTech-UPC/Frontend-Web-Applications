import axios from 'axios';

export async function fetchReservations() {
    try {
        const response = await axios.get('http://localhost:3000/reservationDetails');
        return response.data;
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        return [];
    }
}
