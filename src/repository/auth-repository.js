import { pool } from "../config/database.js";

export class AuthRepository {

    constructor(usertag, hash, status) {
        this.usertag = usertag;
        this.hash = hash;
        this.status = status;
    }

    async userInsert() {
        try {
            const query = `INSERT INTO users(usertag, password, status) 
                           VALUES ($1, $2, $3)`;
            const values = [this.usertag, this.hash, this.status];
            const result = await pool.query(query, values);
            return result;
        } catch (error) {
            throw new Error('Error al guardar datos en la DB');
        }
    }

}