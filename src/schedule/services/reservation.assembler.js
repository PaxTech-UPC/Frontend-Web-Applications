import { Appointment} from "../../AppointmentsClient/model/Appointment.entity.js";

export function assembleAppointments(rawAppointments) {
    return rawAppointments.map(res => new Appointment({
        reservationId: res.reservation.id,
        tipo: res.tipo,
        clientName: res.client.user.name,
        salonName: res.salon.name,
        paymentStatus: res.payment.status,
        timeSlotStart: new Date(res.timeSlot.start),
        timeSlotEnd: new Date(res.timeSlot.end)
    }));
}
