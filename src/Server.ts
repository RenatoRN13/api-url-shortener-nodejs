import express from 'express';
import routes from './Router';

const app = express();

app.use(express.json())
app.use(routes);

app.listen(8081);