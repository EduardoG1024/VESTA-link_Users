import { HashPassword } from "../config/bcrypt.js";

export class CreateUser {

    constructor(usertag, password, confirmPassword) {
        if (!usertag)
            throw new Error('Usertag is not included');
        if (!password)
            throw new Error('Password is not included');
        if (!confirmPassword)
            throw new Error('ConfirmPassword is not included');
        this.usertag = usertag;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.hash = null;
        this.status = true;
    }

    validation() {
        if (this.usertag.length < 8 || this.usertag.length > 50)
            throw new Error('Password must have more than 8 digits and less than 50 digits');
        if (this.confirmPassword != this.password)
            throw new Error('Both passwords must be the same to confirm it');
    }

    async generateHash() {
        const hash = await HashPassword(this.password);
        this.hash = hash;
    }
}