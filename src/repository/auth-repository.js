import { pool } from "../config/database.js";

export class AuthRepository {

    static async CreateNewUserDB(usertag, email, password) {
        try {
            const query = `INSERT INTO users(usertag, email, password) 
                           VALUES ($1, $2, $3) RETURNING *`;
            const values = [usertag, email, password];
            const result = await pool.query(query, values);

            return result;
        } catch (error) {
            throw new Error('Error al guardar usuario en la DB');
        }
    }

    static async GetHashUserDB(usertag) {
        try {
            const query = `SELECT id, password FROM users WHERE usertag = $1`;
            const values = [usertag];
            const result = await pool.query(query, values);
            
            return result;
        } catch (error) {
            throw new Error('Error al obtener hash de la DB');
        }
    }
}