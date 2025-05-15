export class ProfileClient {
    constructor({
                    accountId = '0',
                    name = '',
                    email = '',
                    phoneNumber = '',
                    identityDocument = '',
                    notifications = false,
                    location = false,
                }) {
        this.accountId = accountId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.identityDocument = identityDocument;
        this.notifications = notifications;
        this.location = location;

    }
}
