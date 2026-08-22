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
            throw new Error('Usertag is not included');
        if (!this.password)
            throw new Error('Password is not included');
        if (!this.confirmPassword)
            throw new Error('ConfirmPassword is not included');
        if (this.usertag.length < 8 || this.usertag.length > 50)
            throw new Error('Password must have more than 8 digits and less than 50 digits');
        if (this.confirmPassword != this.password)
            throw new Error('Both passwords must be the same to confirm it');
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