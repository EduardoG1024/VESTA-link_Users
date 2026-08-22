import express from 'express';
import { CreateUser } from '../entity/create-user.js';
import { AuthRepository } from '../repository/auth-repository.js';
import { SignInUserEntity } from '../entity/signIn-entity.js';

export class AuthControllers {

    static SignUpUser = async (req, res) => {
        try {
            const {usertag, password, confirmPassword} = req.body;

            // CREAR USUARIO -> VALIDAR -> GENERAR HASH -> GUARDAR EN DB -> RESPONDER
            const USER = new CreateUser(usertag, password, confirmPassword);
            USER.validation();
            await USER.generateHash();

            // INSERT IN DB
            const CONFIRM = new AuthRepository(USER.usertag, USER.hash, USER.status);
            const DB = await CONFIRM.createNewUserDB();

            return res.status(200).json({
                message: 'Usuario Registrado!',
                usertag: DB.rows,
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

            // CREAR SIGNIN -> VALIDAR -> OBTENER HASH -> CREAR SESION -> RESPONDER
            const USER = new SignInUserEntity(usertag, password);

            USER.DataValidation();
            await USER.GetUserHash();
            await USER.ComparePasswordHash();

            return res.status(200).json({
                message: 'Usuario Autenticado!',
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
            const {usertag, password, confirmPassword} = req.body;

            return res.status(200).json({
                message: 'Usuario Registrado!',
                usertag: usertag,
                created_at: new Date()
            });
        } catch (error) {
            return res.status(400).json({
                message: 'Algo salió mal al registrarte'
            });
        }
    }
}