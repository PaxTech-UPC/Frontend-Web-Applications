export class Favorites {
    constructor({salonid="",
                    location="",
                    imageURL="",
                    phone="",
                    name=""})
    {
        this.salonid = salonid;
        this.location = location;
        this.imageURL = imageURL;
        this.phone = phone;
        this.name=name;
    }
}