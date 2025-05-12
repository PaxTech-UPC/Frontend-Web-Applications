export class Appointment {
        constructor({ reservationId, tipo, clientName, salonName, paymentStatus, timeSlotStart, timeSlotEnd }) {
                this.reservationId = reservationId;
                this.tipo = tipo;
                this.clientName = clientName;
                this.salonName = salonName;
                this.paymentStatus = paymentStatus;
                this.timeSlotStart = new Date(timeSlotStart);
                this.timeSlotEnd = new Date(timeSlotEnd);
        }
}
