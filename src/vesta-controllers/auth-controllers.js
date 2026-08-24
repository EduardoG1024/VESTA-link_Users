import express from 'express';
import { SignUpUserEntity, SignInUserEntity, SignOutUserEntity } from '../entity/auth-entity/index.js';

export class AuthControllers {

    static SignUpUser = async (req, res) => {
        try {
            const {usertag, password, confirmPassword} = req.body;

            // CREAR USUARIO -> VALIDAR -> GENERAR HASH -> GUARDAR EN DB -> RESPONDER
            const USER = new SignUpUserEntity(usertag, password, confirmPassword);

            USER.DataValidation();
            await USER.GenerateHash();
            const DB = await USER.CreateNewUser();

            return res.status(200).json({
                message: `Usuario ${DB.rows[0].usertag} Registrado!`,
                user: 'En caso de olvidar tu contraseña envia tu reporte a:',
                reports: 'https://vestalink.vercel.app/reports',
            });

        } catch (error) {
            return res.status(400).json({
                message: 'Algo salió mal al registrarte',
                error: error.message
            });
        }
    }

    static SignInUser = async (req, res) => {
        try {
            const {usertag, password} = req.body;

            // VALIDAR SI LA SESSION EXISTE -> CREAR SIGNIN -> 
            // VALIDAR -> OBTENER HASH -> CREAR SESION -> RESPONDER
            const USER = new SignInUserEntity(usertag, password);
            
            USER.DataValidation();
            await USER.GetUserHash();
            await USER.ComparePasswordHash();
            USER.CreateUserSession(req);

            return res.status(200).json({
                message: 'Usuario Autenticado!',
                session: req.session.user
            });

        } catch (error) {
            return res.status(400).json({
                message: 'Algo salió mal al registrarte',
                error: error.message
            });
        }
    }

    static SignOutUser = (req, res) => {
        try {
            SignOutUserEntity.ValidateSessionExist(req);
            SignOutUserEntity.DestroyUserSession(req, res);

            return res.status(200).json({
                message: 'Session Terminada',
            });
        } catch (error) {
            return res.status(400).json({
                message: 'Algo salió mal al terminar la session',
                error: error.message
            });
        }
    }
}