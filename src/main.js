import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';

import { envs } from './config/envs.js';
import auth from './vesta-routers/auth-routers.js';
import profile from './vesta-routers/profile-routers.js';

(() => {
    const app = express();

    app.use(helmet());
    app.use(cors({
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST', 'DELETE']
    }));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(session({
        secret: envs.SECRET_SESSION,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 1000,
        }
    }));
    app.use('/auth', auth);
    app.use('/profile', profile);


    app.listen(envs.PORT, () => {
        console.log(`VESTAlink escuchando en el puerto ${envs.PORT}`);
    });
})();