import { pool } from "../config/database.js";

export class ProfileRepository {

    static async GetUserLinksDB(id) {
        try {
            const query = `SELECT url, embed, category_1, category_2, category_3 FROM links
                           WHERE user_id = $1`;
            const values = [id];
            const result = await pool.query(query, values);

            return result;
        } catch (error) {
            throw new Error('Error al consultar URLs en la DB');
        }
    }

    static async AddNewUserLinkDB(id, url, embed, one, two, three) {
        try {
            const query = `INSERT INTO links (user_id, url, embed, category_1, category_2, category_3)
                           VALUES($1, $2, $3, $4, $5, $6)`;
            const values = [id, url, embed, one, two, three];
            const result = await pool.query(query, values);

            return result;
        } catch (error) {
            throw new Error('Error al añadir nueva URL en la DB');
        }
    }
    
    static async UpdateExistingUserLinkDB(url, embed, one, two, three, id, old) {
        try {
            const query = `UPDATE links SET 
                           url = $1
                           embed = $2
                           category_1 = $3
                           category_2 = $4
                           category_3 = $5
                           WHERE user_id = $6 and url = $7`;
            const values = [url, embed, one, two, three, id, old];
            const result = await pool.query(query, values);

            return result;
        } catch (error) {
            throw new Error('Error al actualizar la URL en la DB');
        }
    }

    static async DeleteUserSingleLinkDB(id, url) {
        try {
            const query = `DELETE FROM links
                           WHERE user_id = $1 AND url = $2`;
            const values = [id, url];
            const result = await pool.query(query, values);

            return result;
        } catch (error) {
            throw new Error('Error al eliminar URL en la DB');
        }
    }
}