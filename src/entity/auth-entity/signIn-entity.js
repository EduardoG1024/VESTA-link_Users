import express from 'express';
import { AuthRepository } from "../../repository/auth-repository.js";
import { CompareHash } from "../../config/bcrypt.js";

export class SignInUserEntity {

    constructor(usertag, password) {
        this.id = null;
        this.usertag = usertag;
        this.password = password;
        this.hash = null;
    }

    DataValidation() {
        if (!this.usertag)
            throw new Error('Falta Usertag');
        if (!this.password)
            throw new Error('Falta Password');
    }

    async GetUserHash() {
        try {
            const HASH = await AuthRepository.GetHashUserDB(this.usertag);
            this.id = HASH.rows[0].id;
            this.hash = HASH.rows[0].password;
        } catch (error) {
            throw new Error('Error en GetUserHash');
        }
    }

    async ComparePasswordHash() {
        if (!await CompareHash(this.password, this.hash))
            throw new Error('Contraseña incorrecta');
    }

    async GetUserProfileForSession() {

    }

    CreateUserSession = (req) => {
        req.session.user = {
            id: this.id,
            usertag:this.usertag
        }
    }
}