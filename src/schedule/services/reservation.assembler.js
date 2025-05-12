<<<<<<< HEAD
import { Reservation } from "../model/reservation.entity.js";

export class ReservationAssembler {
    static toEntityFromResource(resource) {
        return new Reservation(resource);
    }

    static toEntitiesFromResponse(response) {
        console.log(response.data.map(resource => this.toEntityFromResource(resource)));
        return response.data.map(resource => this.toEntityFromResource(resource));
    }
=======
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
>>>>>>> feature/Appointment
}
