import validator from 'validator';

import Jwt from '../services/jwtService'
import User from '../services/userService'
import { Response } from '../models/responseModel'
import { UserData } from '../models/userModel';

const userService = new User();
const jwtService = new Jwt();

export default class UserController {
    public async login(req, res) {
        try{
            const { username, password } = req.body;
            const user = await userService.getUserByEmail(username);
            if(!user) {
                return res.status(404)
                    .send(new Response(404, null, 'User not found'));
            }
            if(!user.validPassword(password)) {
                return res.status(401)
                    .send(new Response(401, null, 'Invalid password'));
            }

            const result = new UserData(
                user._id,
                user.name,
                user.surname,
                user.username,
                jwtService.generateToken(user.username, user._id)
            )

            return res.status(200)
                .send(new Response(200, result, 'User successfully loged in'));
        } catch(error) {
            return res.status(500).send(new Response());
        }
    }

    public async register(req, res) {
        try {
            const {
                name,
                surname,
                username,
                password,
            } = req.body;
            if(
                !name || !surname || !username||
                !password || !validator.isEmail(req.body.username)
            ) {
                return res.status(400)
                    .send(new Response(400, null, 'Invalid data provided'));
            }

            const possibleUser = await userService.getUserByEmail(username);
            if(possibleUser){
                return res.status(400)
                    .send(new Response(400, null, 'User with this email already exist'));
            }
            const user = await userService.addNewUser(req.body);
            if(user) {
                user.token = jwtService.generateToken(user.username, user.id);
                res.status(200)
                    .send(new Response(200, user, 'User successfully saved'));
            } else {
                throw new Error("error");
            }
        } catch (error) {
            return res.status(500).send(new Response());
        }
    }

    public async currentUser(req, res) {
        try {
            const { userId, token } = req.user;
            const user = await userService.getUserById(userId);
            if(!user) {
                res.status(404)
                    .send(new Response(404, user, 'User not found')); 
            }
            user.token = token;
            res.status(200)
                .send(new Response(200, user, 'User data'));
        } catch (error) {
            return res.status(500).send(new Response());
        }
    }
}