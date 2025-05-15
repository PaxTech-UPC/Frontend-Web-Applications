import {Service} from "../model/service.entity.js";

export class ServiceAssembler {
    static toEntityFromResource(resource) {
        return new Service(resource);
    }

    static toEntitiesFromResponse(response) {
        return response.data.map(resource => this.toEntityFromResource(resource));
    }
}
