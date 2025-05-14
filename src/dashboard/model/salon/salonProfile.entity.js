export class SalonProfile {
    constructor(id = 0,
                salonId = "",
                salonName = "",
                rating = 0,
                profileImage = "",
                coverImage = "",
                socials = {},
                portfolioImages = []) {
        this.id = id;
        this.salonId = salonId;
        this.salonName = salonName;
        this.rating = rating;
        this.profileImage = profileImage;
        this.coverImage = coverImage;
        this.socials = socials;
        this.portfolioImages = portfolioImages;
    }
}