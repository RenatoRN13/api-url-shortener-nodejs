import knex from '../database/connection';
import ShortUrlRegister from '../model/ShortUrlRegister';

class ShortenerService {

    public async getAllUrlRegister() {
        const currentDate = new Date().toLocaleDateString('en-CA');        
        const items = await knex('urls').where('validation_date', '>=', currentDate).select('*');
        
        return items;
    }
    
    public async getUrlRegister(shortUrl: string) {

        const currentDate = new Date().toLocaleDateString('en-CA');        
        const item = await knex('urls').where('short_url', shortUrl).first().andWhere('validation_date', '>=', currentDate).first();

        if(item != null) {
            const serealizedItem: ShortUrlRegister = new ShortUrlRegister(item['id'], item['short_url'], item['full_url'], item['validation_date']);
            return serealizedItem;
        }
        
        throw new Error("Not Found");
    }

    public async postUrlRegister(url: string, baseUrl: any){
        url = url.replace('https://', '');
        url = url.replace('http://', '');
        
        const currentDate = new Date().toLocaleDateString('en-CA');    
        const item: ShortUrlRegister = await knex('urls').where('full_url', url).andWhere('validation_date', '>=', currentDate).first();
        
        if(item != null) {
            throw new Error("Bad request");
        }
        
        const response = await this.generateShortUrl(baseUrl).then(
            async (result) => { 
                const validationDate = new Date();
                validationDate.setDate(validationDate.getDate() + 15);

                const newRegister = { "short_url": `${baseUrl}/${result}`, "full_url": url, "validation_date": validationDate };

                const trx = await knex.transaction();
                await trx('urls').insert(newRegister);                  
                trx.commit();

                return newRegister;
            }
        );
        return response.short_url;
    }

    public async generateShortUrl(baseUrl: string) {
        let newShortUrl = Math.random().toString(36).slice(-10);
        return await this.validateNewShortUrl(`${baseUrl}/${newShortUrl}`).then(
            (result) => {
                if(result == false) {
                    this.generateShortUrl(baseUrl);
                }
                return newShortUrl;
            }
        )
    }

    public async validateNewShortUrl(shortUrl: string){
        try {
            await this.getUrlRegister(shortUrl).then((result) => { return false; });
            return false;
        } catch (error) {
            return true;
        }
    }
}

export default ShortenerService;