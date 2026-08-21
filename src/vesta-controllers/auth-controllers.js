import express from 'express';
import { CreateUser } from '../entity/create-user.js';
import { AuthRepository } from '../repository/auth-repository.js';

export class AuthControllers {

    static SignUpUser = async (req, res) => {
        try {
            const {usertag, password, confirmPassword} = req.body;

            // CREATE USER
            const USER = new CreateUser(usertag, password, confirmPassword);
            USER.validation();
            await USER.generateHash();

            // INSERT IN DB
            const CONFIRM = new AuthRepository(USER.usertag, USER.hash, USER.status);
            const DB = await CONFIRM.userInsert();

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

    static SignInUser = (req, res) => {
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