import { Appointment } from './Appointment'; // Ajusta la ruta si es necesario

export function assembleAppointment(data) {
    return new Appointment({
        reservationId: data.reservationId,
        tipo: data.tipo,
        clientName: data.clientName,
        salonName: data.salonName,
        paymentStatus: data.paymentStatus,
        timeSlotStart: new Date(data.timeSlotStart),
        timeSlotEnd: new Date(data.timeSlotEnd),
    });
}
