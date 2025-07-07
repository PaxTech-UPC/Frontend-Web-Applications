import { Appointment } from "../model/Appointment.entity.js";

export class AppointmentAssembler {
    static async toEntity(reservation, apiService) {
        const [timeSlotRes, providerRes, paymentRes, workerRes] = await Promise.all([
            apiService.getTimeSlotById(reservation.timeSlotId),
            apiService.getProviderById(reservation.providerId),
            apiService.getPaymentById(reservation.paymentId),
            apiService.getWorkerById(reservation.workerId), // 👈 Traer el worker
        ]);

        const timeSlot = timeSlotRes.data;
        const provider = providerRes.data;
        const payment = paymentRes.data;
        const worker = workerRes.data;

        return new Appointment({
            id: reservation.id,
            // 👇 HARD-CODE: nombre aleatorio de servicio
            serviceName: AppointmentAssembler.getRandomServiceName(),
            providerName: provider.companyName,
            startTime: timeSlot.startTime,
            endTime: timeSlot.endTime,
            paymentStatus: payment.status === "Paid" ? "Pagado" : "Pendiente",
            workerName: `${worker.firstName} ${worker.lastName}`
        });
    }

    static async toEntities(reservations, apiService) {
        return Promise.all(
            reservations.map((reservation) => this.toEntity(reservation, apiService))
        );
    }

    // 👇 Agrega este método helper
    static getRandomServiceName() {
        const services = [
            "Corte de Pelo",
            "Manicure",
            "Pedicure",
            "Masaje",
            "Tinte️"
        ];
        const randomIndex = Math.floor(Math.random() * services.length);
        return services[randomIndex];
    }
}
