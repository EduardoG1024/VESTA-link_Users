import rateLimit from "express-rate-limit";

export class RateLimitUser {

    static limitSignUp = rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 10,
        standardHeaders: 'draft-8',
        legacyHeaders: false, 
        ipv6Subnet: 56, 
        message: 'Haz alcanzado el limite de peticiones, intenta mas tarde'
    });

    static limitSignIn = rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 8,
        standardHeaders: 'draft-8',
        legacyHeaders: false, 
        ipv6Subnet: 56, 
        message: 'Haz alcanzado el limite de intentos, intenta mas tarde'
    });
}