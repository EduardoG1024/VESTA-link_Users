
export class SignOutUserEntity {

    static DestroyUserSession(req, res) {
        req.session.destroy();
        res.clearCookie('connect.sid');
    }


}