export function assembleReservations(rawReservations) {
    return rawReservations.map(res => ({
        id: res.reservationId,
        tipo: res.tipo,
        clientName: res.client.user.name,
        workerName: res.worker.name,
        start: new Date(res.timeSlot.start),
        end: new Date(res.timeSlot.end),
        location: res.salon.location,
        salonPhone: res.salon.phone,
        amount: res.payment.amount,
        paid: res.payment.status,
        slotType: res.timeSlot.tipo
    }));
}
