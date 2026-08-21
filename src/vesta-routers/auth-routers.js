import express, {Router} from 'express';
import { AuthControllers } from '../vesta-controllers/auth-controllers.js';

const auth = Router();

auth.post('/signup', AuthControllers.SignUpUser);
auth.post('/signin', AuthControllers.SignInUser);
auth.get('/signout', AuthControllers.SignOutUser);

export default auth;