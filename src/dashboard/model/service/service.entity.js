export class Service {
    constructor(id = "",
                name = "",
                duration = 0,
                price = 0,
                status = "") {
        this.id = id;
        this.name =  name;
        this.duration = duration;
        this.price = price;
        this.status = status;
    }
}