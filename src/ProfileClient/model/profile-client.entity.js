export class ProfileClient {
    constructor({
                    accountId = '0',
                    name = '',
                    email = '',
                    phoneNumber = '',
                    identityDocument = '',
                    notifications = false,
                    location = false
                }) {
        this.accountId = accountId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber || ProfileClient.getRandomPhone();
        this.identityDocument = identityDocument || ProfileClient.getRandomDNI();
        this.notifications = notifications;
        this.location = location;
    }

    static getRandomPhone() {
        const phones = [
            "+51 987 654 321",
            "+51 912 345 678",
            "+51 956 789 123",
            "+51 901 234 567",
            "+51 999 888 777"
        ];
        return phones[Math.floor(Math.random() * phones.length)];
    }

    static getRandomDNI() {
        const dnis = [
            "12345678",
            "87654321",
            "11223344",
            "99887766",
            "44556677"
        ];
        return dnis[Math.floor(Math.random() * dnis.length)];
    }
}
