import { ProfileClient } from "../model/profile-client.entity.js";

export class ProfileClientAssembler {
    static toEntityFromResource(resource) {
        return new ProfileClient(resource);
    }

    static toEntityFromTwoResources(clientData, userData) {
        return new ProfileClient({
            accountId: clientData.id,
            name: `${clientData.firstName} ${clientData.lastName}`, // ✅ Nombre completo
            email: userData.email,
            phoneNumber: '', // Lo rellenaremos random en la entidad
            identityDocument: '', // Lo rellenaremos random en la entidad
            notifications: false,
            location: false
        });
    }
}
