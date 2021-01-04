var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserModel } from '../schemas/User';
import bcrypt from "bcrypt";
function verifyHash(password, original) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, original, function (err, result) {
            if (err || !result)
                reject(new Error(err));
            resolve(result);
        });
    });
}
export default {
    authenticateUser(username, password) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ username: username })
                .then(userRecord => {
                if (!userRecord)
                    reject("User does not exist.");
                verifyHash(password, userRecord.password)
                    .then(_ => resolve(userRecord))
                    .catch(_ => reject("Password is not correct."));
            })
                .catch(_ => reject("Database Error"));
        });
    },
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRecord = yield UserModel.create(user);
            if (!userRecord)
                throw new Error('Failed to create user.');
            return userRecord;
        });
    },
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRecord = yield UserModel.findOneAndUpdate(user);
            if (!userRecord)
                throw new Error('Failed to create user.');
            return userRecord;
        });
    },
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRecord = yield UserModel.findOne({ _id: userId }).populate('courses');
            if (!userRecord)
                throw new Error('User not found.');
            return userRecord;
        });
    },
    validateUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRecord = yield UserModel.findById(userId);
            if (!userRecord)
                throw new Error('Failed to find user');
            return userRecord;
        });
    }
};
