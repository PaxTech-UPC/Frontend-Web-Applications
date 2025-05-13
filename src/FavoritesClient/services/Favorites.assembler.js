import {Favorites} from "../model/Favorites.entity.js";

export class FavoriteAssembler {
    static toEntityFromResource(resource) {
        return new Favorites(resource);
    }

    static toEntitiesFromResponse(response) {
        console.log(response.data.map(resource => this.toEntityFromResource(resource)));
        return response.data.map(resource => this.toEntityFromResource(resource));
    }

}

