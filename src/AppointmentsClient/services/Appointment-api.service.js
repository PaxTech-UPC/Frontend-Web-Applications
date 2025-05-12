import axios from 'axios';
import {assemblerAppointments} from './Appointment.assembler.js';

export async function fetchReservations() {
    try {
        const response = await axios.get('http://localhost:3000/reservationDetails');
        return assemblerAppointments(response.data);
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        return [];
    }
}
