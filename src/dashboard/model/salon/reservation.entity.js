export class Reservation {
    constructor(salonId, clientId, paymentId, timeSlotId, workerId) {
        this.salonId = salonId;
        this.clientId = clientId;
        this.paymentId = paymentId;
        this.timeSlotId = timeSlotId;
        this.workerId = workerId;
    }
}
