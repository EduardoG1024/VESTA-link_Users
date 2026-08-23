
export class SignOutUserEntity {

    static ValidateSessionExist(req) {
        if (!req.session.user)
                throw new Error('No hay ningun usuario autenticado');
    }

    static DestroyUserSession(req, res) {
        req.session.destroy();
        res.clearCookie('connect.sid');
    }


}