export class Review {
    constructor(
        id = 0,
        author = '',
        rating = 0,
        text = '',
        read = false
    ) {
        this.id = id;
        this.author = author;
        this.rating = rating;
        this.text = text;
        this.read = read;
    }
}
