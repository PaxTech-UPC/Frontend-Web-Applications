import {Review} from "../model/review.entity.js";

export class AppointmentAssembler {
    static toEntityFromResource(resource) {
        return new Review(resource);
    }

    static toEntitiesFromResponse(response) {
        return response.data.map(resource => this.toEntityFromResource(resource));
    }
}
