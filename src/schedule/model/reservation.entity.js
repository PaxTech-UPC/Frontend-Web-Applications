export class Reservation {
    constructor({
                    reservationId = "",
                    tipo = "",
                    client = {
                        user: { name: "" }
                    },
                    worker = {
                        name: "",
                        providerId: null // ✅ Asegúrate de traer el providerId
                    },
                    timeSlot = {
                        start: "",
                        end: ""
                    },
                }) {
        this.reservationId = reservationId;
        this.tipo = tipo;
        this.client = client;
        this.worker = worker;
        this.timeSlot = timeSlot;
    }
}
