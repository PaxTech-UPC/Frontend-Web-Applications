import { Appointment } from "../model/Appointment.entity.js";

export function assembleAppointment(data) {
    return new Appointment({
        reservationId: data.reservationId,
        tipo: data.tipo,
        clientName: data.client?.user?.name || "Unknown",
        salonName: data.salon?.location || "Unknown",
        paymentStatus: data.payment?.status || false,
        timeSlotStart: data.timeSlot?.start,
        timeSlotEnd: data.timeSlot?.end,
    });
}

export function assembleAppointments(dataArray) {
    return dataArray.map(data => assembleAppointment(data));
}