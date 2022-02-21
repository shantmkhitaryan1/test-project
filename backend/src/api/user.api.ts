import { Router } from 'express';
import UserController from '../controller/userController';
import { verifyUser } from '../middleware/auth';

const route = Router();
const userController = new UserController();

route.post('/login', userController.login);
route.post('/register', userController.register);
route.get('/currentUser', verifyUser, userController.currentUser);

export default route;
