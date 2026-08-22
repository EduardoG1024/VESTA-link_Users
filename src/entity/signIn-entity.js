import { AuthRepository } from "../repository/auth-repository.js";
import { CompareHash } from "../config/bcrypt.js";

export class SignInUserEntity {

    constructor(usertag, password) {
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
            this.hash = HASH.rows[0].password;
        } catch (error) {
            throw new Error('Error en GetUserHash');
        }
    }

    async ComparePasswordHash() {
        if (!await CompareHash(this.password, this.hash))
            throw new Error('Contraseña incorrecta');
    }
}