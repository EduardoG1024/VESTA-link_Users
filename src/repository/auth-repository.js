import { pool } from "../config/database.js";

export class AuthRepository {

    static async CreateNewUserDB() {
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

    static async GetHashUserDB(usertag) {
        try {
            const query = `SELECT password FROM users WHERE usertag = $1`;
            const values = [usertag];
            const result = await pool.query(query, values);
            
            return result;
        } catch (error) {
            throw new Error('Error al obtener hash de la DB');
        }
    }

}