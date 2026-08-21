import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function HashPassword(password) {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}

export async function CompareHash(password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.log(err.message);
        throw new Error(error.message);
    }
}