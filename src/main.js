import express from 'express';
import session from 'express-session';
import 'dotenv/config';

import { envs } from './config/envs.js';
import auth from './vesta-routers/auth-routers.js';

(() => {
    
})();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/auth', auth);


app.listen(envs.PORT, () => {
    console.log(`VESTAlink escuchando en el puerto ${envs.PORT}`);
});