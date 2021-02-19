import express from 'express';
import cors from 'cors';
import swaggerUi from'swagger-ui-express';

import ShortenerController from './controller/ShortenerController';

const openApiDocumentation = require('./openApiDocumentation');

const routes = express.Router();
routes.use(cors())

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(openApiDocumentation));

const shortenerController = new ShortenerController();

routes.get('/:id', shortenerController.get);
routes.get('/', shortenerController.getAll);
routes.post('/encurtador', shortenerController.post);

export default routes;