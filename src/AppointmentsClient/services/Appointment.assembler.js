import { Appointment } from "../model/Appointment.entity.js";

export class AppointmentAssembler {
    static toEntityFromResource(resource) {
        return new Appointment(resource);
    }

    static toEntitiesFromResponse(response) {
        return response.data.map(resource => this.toEntityFromResource(resource));
    }
}
