export class Reservation {
    constructor({
                    reservationId = "",
                    tipo = "",
                    client = {
                        user : {
                            name :""
                        }
                    },
                    worker = {
                        name:""
                    },
                    timeSlot = {
                        start: "",
                        end:""
                    },
                }) {
        this.reservationId = reservationId;
        this.tipo = tipo;
        this.client = client;
        this.worker = worker;
        this.timeSlot = timeSlot;
    }
}