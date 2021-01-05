import jwt from "jsonwebtoken";
import config from "../config";
import {JwtPayload} from "../schemas/Interfaces";

export default {
    sign(payload: JwtPayload): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, config.SECRET, {expiresIn: '365d'}, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
        });
    },
    verify(token): Promise<JwtPayload> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.SECRET, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
        });
    }
}
