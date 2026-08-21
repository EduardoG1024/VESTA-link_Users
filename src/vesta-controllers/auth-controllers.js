import express from 'express';
import { CreateUser } from '../entity/create-user.js';

export class AuthControllers {

    static SignUpUser = async (req, res) => {
        try {
            const {usertag, password, confirmPassword} = req.body;

            // CREATE USER
            const USER = new CreateUser(usertag, password, confirmPassword);
            USER.validation();
            await USER.generateHash();

            // INSERT IN DB

            return res.status(200).json({
                message: 'Usuario Registrado!',
                usertag: USER,
                created_at: new Date()
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