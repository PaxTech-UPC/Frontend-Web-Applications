export class SalonProfile {
    constructor(id, companyName, services = [], reviews = []) {
        this.id = id;
        this.companyName = companyName;
        this.coverImage = SalonProfile.randomImage();
        this.location = SalonProfile.randomLocation();
        this.rating = SalonProfile.randomRating();
        this.services = services;
        this.reviews = reviews;
    }

    static randomImage() {
        const images = [
            "https://media.istockphoto.com/id/1856117770/es/foto/sal%C3%B3n-de-belleza-moderno.jpg?s=612x612&w=0&k=20&c=o02QxR7CpUcWXaeQ4W3k3ig6RPLsWcIO0lA9vbwnuCU=",
            "https://images.adsttc.com/media/images/5012/c42c/28ba/0d70/2000/0008/large_jpg/stringio.jpg?1414282468",
            "https://cdn.shopify.com/s/files/1/0258/6276/6677/files/Audrey_Hepburn_bubblegum_074b317c-e49e-4207-87bd-031f49751976_600x600.png?v=1700511802",
            "https://biblus.accasoftware.com/es/wp-content/uploads/sites/3/2025/03/Como-disenar-un-centro-estetico-de-lujo.jpg.webp",
            "https://i.pinimg.com/originals/10/6e/e9/106ee9098e45c70bbee499ec16636eaf.jpg"
        ];
        return images[Math.floor(Math.random() * images.length)];
    }

    static randomLocation() {
        const locations = [
            "Miraflores, Lima",
            "San Isidro, Lima",
            "Barranco, Lima",
            "Jesús María, Lima",
            "La Molina, Lima"
        ];
        return locations[Math.floor(Math.random() * locations.length)];
    }

    static randomRating() {
        return Math.floor(Math.random() * 5) + 1;
    }
}
