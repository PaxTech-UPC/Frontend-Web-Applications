export class Appointment {
    constructor({
                    id,
                    serviceName,
                    providerName,
                    startTime,
                    endTime,
                    paymentStatus,
                    workerName // 👈 Nuevo campo
                }) {
        this.id = id;
        this.serviceName = serviceName;
        this.providerName = providerName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.paymentStatus = paymentStatus;
        this.workerName = workerName;
    }
}
