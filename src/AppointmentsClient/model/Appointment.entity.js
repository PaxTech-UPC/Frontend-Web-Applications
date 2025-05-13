export class Appointment {
        constructor({
                            reservationId = "",
                            tipo = "",
                            client = "",
                            salon = "",
                            payment = "",
                            timeSlotStart = "",
                            timeSlotEnd = "",
            worker=""
                    }) {
                this.reservationId = reservationId;
                this.tipo = tipo;
                this.worker= worker;
                this.clientName = client?.user?.name || "Unknown";
                this.salonName = salon?.location || "Unknown";
                this.paymentStatus =  payment?.status || false;
                this.timeSlotStart = timeSlotStart ? new Date(timeSlotStart) : null;
                this.timeSlotEnd = timeSlotEnd ? new Date(timeSlotEnd) : null;
        }
}
