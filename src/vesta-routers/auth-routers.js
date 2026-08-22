import express, {Router} from 'express';
import { AuthControllers } from '../vesta-controllers/auth-controllers.js';

const auth = Router();

auth.post('/signUp', AuthControllers.SignUpUser);
auth.post('/signIn', AuthControllers.SignInUser);
auth.get('/signOut', AuthControllers.SignOutUser);

export default auth;