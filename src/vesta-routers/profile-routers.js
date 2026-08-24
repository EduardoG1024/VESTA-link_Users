import express, {Router} from "express";
import { ProfileControllers } from "../vesta-controllers/profile-controllers.js";

const profile = Router();

profile.get('/getLinks', ProfileControllers.GetUserLinks);
profile.post('/addLink', ProfileControllers.AddUserLink);
//profile.put('/updateLink');
//profile.delete('/deleteLink');

export default profile;
