class ShortUrlRegister {
    id: number;
    shortUrl: string;
    fullUrl: string;
    validationDate: Date;

    constructor(id: number, shortName: string, url: string, validationDate: Date){
        this.id = id;
        this.shortUrl = shortName;
        this.fullUrl = url;
        this.validationDate = validationDate;
    }
}

export default ShortUrlRegister;