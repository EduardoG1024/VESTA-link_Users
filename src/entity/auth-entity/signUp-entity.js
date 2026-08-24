import { HashPassword } from "../../config/bcrypt.js";
import { AuthRepository } from "../../repository/auth-repository.js";

export class SignUpUserEntity {

    constructor(usertag, password, confirmPassword) {
        this.usertag = usertag;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.hash = null;
    }

    DataValidation() {
        if (!this.usertag)
            throw new Error('Usertag no esta incluido');
        if (!this.password)
            throw new Error('Password no esta incluido');
        if (!this.confirmPassword)
            throw new Error('ConfirmPassword no esta incluido');
        if (this.password.length < 8 || this.password.length > 50)
            throw new Error('Password debe tener 8 digitos y menos de 50 digitos');
        if (this.confirmPassword != this.password)
            throw new Error('Ambas contraseñas deben ser iguales para continuar');
    }

    async GenerateHash() {
        try {
            const hash = await HashPassword(this.password);
            this.hash = hash;
        } catch (error) {
            throw new Error('Error al generar hash para password');
        }
    }

    async CreateNewUser() {
        try {
            const DB = await AuthRepository.CreateNewUserDB(this.usertag, this.hash);
            return DB;
        } catch (error) {
            throw new Error('Error al guardar usuario en la DB');
        }
    }
}