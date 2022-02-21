import jwt from "jsonwebtoken";

const key = process.env.JWT_KEY || "sample_key"

export default class Jwt {
    generateToken(email: string, userId: string) {
        try {
            return jwt.sign(
                { userId, email }, key,
                {
                  expiresIn: "4h",
                }
            );
        } catch(error) {
            return null
        }
    }

    verifyToken(token: string) {
        try {
            return jwt.verify(token, key);
        } catch (error) {
            return null;            
        }
    }
}