import {Session} from '../models/session';
import jwt from "jsonwebtoken";
import config from "../config";
import {v4} from "uuid";

export default {
    sign(payload) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, config.SECRET,
                {expiresIn: '365d'}, (err, token) => {
                    if(err) reject(err);
                    resolve(token);
                });
        });
    },
    verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.SECRET, (err, token) => {
                    if(err) reject(err);
                    resolve(token);
                });
        });
    }
}
