export class Reservation {
    constructor({ id, tipo, clientName, workerName, start, end, location, salonPhone, amount, paid, slotType }) {
        this.id = id;
        this.tipo = tipo;
        this.clientName = clientName;
        this.workerName = workerName;
        this.start = start;
        this.end = end;
        this.location = location;
        this.salonPhone = salonPhone;
        this.amount = amount;
        this.paid = paid;
        this.slotType = slotType;
    }

    isPaid() {
        return this.paid === true || this.paid === 'paid'; // depende de cómo venga el JSON
    }

    getTimeRange() {
        return `${this.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${this.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
}
