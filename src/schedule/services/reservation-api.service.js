import axios from 'axios';
import { assembleReservations } from './reservation.assembler';

export async function fetchReservations() {
    try {
        const response = await axios.get('http://localhost:3000/reservationDetails');
        return assembleReservations(response.data);
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        return [];
    }
}
