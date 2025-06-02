import { Reservation } from "../model/reservation.entity.js";

export class ReservationAssembler {
    static toEntityFromResource(resource) {
        return new Reservation(resource);
    }

    static toEntitiesFromResponse(response) {
        console.log(response.data.map(resource => this.toEntityFromResource(resource)));
        return response.data.map(resource => this.toEntityFromResource(resource));
    }
<<<<<<< HEAD

}

=======
}
>>>>>>> 4458cd90eb36c259ba44cd854f734a6bf4f31493
