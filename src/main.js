import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';

import { envs } from './config/envs.js';
import auth from './vesta-routers/auth-routers.js';

(() => {
    const app = express();

    app.use(helmet());
    app.use(cors({
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST', 'DELETE']
    }));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use('/auth', auth);


    app.listen(envs.PORT, () => {
        console.log(`VESTAlink escuchando en el puerto ${envs.PORT}`);
    });
})();