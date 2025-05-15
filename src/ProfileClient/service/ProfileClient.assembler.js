import {ProfileClient} from "../model/profile-client.entity.js";
import {Favorites} from "../../FavoritesClient/model/Favorites.entity.js";

export class ProfileClientAssembler{
    static toEntityFromResource(resource) {
        return new ProfileClient(resource);
    }
    static toEntitiesFromResponse(response) {
        console.log(response.data.map(resource => this.toEntityFromResource(resource)));
        return response.data.map(resource => this.toEntityFromResource(resource));
    }
}