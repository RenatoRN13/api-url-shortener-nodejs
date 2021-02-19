import { Request, Response } from 'express';
import ShortUrlRegister from '../model/ShortUrlRegister';
import ShortenerService from '../service/ShortenerService';

const shortenerService = new ShortenerService();

class shortenerController {

    async get (req: Request, res: Response) {
        const shortName = req.params.id;
        
        await shortenerService.getUrlRegister(req.headers.host + '/' + shortName)
            .then(
                (result: ShortUrlRegister) => {
                    if(result != null) {                        
                        return res.redirect('http://' + result.fullUrl);
                    }
            }).catch(
                (fail) => { return res.sendStatus(404) }
            );
    }

    async post (req: Request, res: Response) {
        const { url } = req.body;        
        shortenerService.postUrlRegister(url, req.headers.host)            
            .then(
                (result) => {
                    return res.json(result);
                })
            .catch(fail => { return res.status(400).send('URL already registred!') });
    }

    async getAll (req: Request, res: Response) {
        shortenerService.getAllUrlRegister().then((result) => {
            res.json(result);
        }).catch(fail => res.status(500).send("System Unavailable. Please contact the support."))

    }    
}

export default shortenerController;