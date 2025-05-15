export class Service {
    constructor(
        id = 0,
        name = '',
        description = '',
        duration = 0,
        price = 0,
        status = 'Active',
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.price = price;
        this.status = status;
    }
}
