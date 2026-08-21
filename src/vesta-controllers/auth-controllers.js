import express from 'express';

export class AuthControllers {

    static SignUpUser = (req, res) => {
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