import {ObjectId} from "mongodb";
import {User} from "./User";

export interface Context {
    userId: ObjectId;
}

export interface JwtPayload {
    userId: string,
    user: User;
}
