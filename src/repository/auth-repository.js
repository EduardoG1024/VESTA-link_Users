import { pool } from "../config/database.js";

export class AuthRepository {

    constructor(usertag, password, status) {
        this.usertag = usertag;
        this.password = password;
        this.status = status;
    }

    async userInsert() {
        try {
            const query = `INSERT INTO users(usertag, password, status) 
                           VALUES ($1, $2, $3) RETURNING *`;
            const values = [this.usertag, this.password, this.status];
            const result = await pool.query(query, values);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getUsers() {
        try {
            const query = `SELECT * FROM users`;
            const result = await pool.query(query);
            return result;
        } catch (error) {
            throw new Error('Error al obtener los usurios de la DB');
        }
    }

}