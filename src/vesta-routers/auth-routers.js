import express, {Router} from 'express';
import { AuthControllers } from '../vesta-controllers/auth-controllers.js';
import { RateLimitUser } from '../middlewares/rate-limit.js';

const auth = Router();

auth.post('/signUp', RateLimitUser.limitSignUp, AuthControllers.SignUpUser);
auth.post('/signIn', RateLimitUser.limitSignIn, AuthControllers.SignInUser);
auth.get('/signOut', AuthControllers.SignOutUser);

export default auth;