export class Salon {
    constructor(salonId = "",
                salonName = "",
                location = "",
                phone = "",
                coverImage = "",
                rating = 0) {
        this.salonId = salonId;
        this.salonName = salonName;
        this.location = location;
        this.phone = phone;
        this.coverImage = coverImage;
        this.rating = rating;
    }
}