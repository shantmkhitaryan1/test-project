import Jwt from "../services/jwtService";
import { Response } from '../models/responseModel'

const jwtService = new Jwt();

export const verifyUser = (req, res, next) => {
    try {
        const token = req?.headers?.authorization || req?.headers?.Authorization;
        if (!token) {
            return res.status(403).send(new Response(403, null, "Token required"));
        }
        const user = jwtService.verifyToken(token);
        if(!user) {
            return res.status(401).send(new Response(401, null, "Invalid token"));
        }
        user.token = token;
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).send(new Response(401, null, "Invalid token"));
    }
}