import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function HashPassword(password) {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        throw new Error('Error al hashear password');
    }
}

export async function CompareHash(password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw new Error('Error al comparar password con hash');
    }
}