import {UserModel} from '../schemas/User';
import bcrypt from "bcrypt";

function verifyHash(password: string, original: string) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, original, function (err, result) {
            if (err || !result) reject(new Error(err));
            resolve(result);
        });
    });
}

export default {
    authenticateUser(username, password) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({username: username})
                .then(userRecord => {
                    if (!userRecord) reject("User does not exist.")
                    verifyHash(password, userRecord.password)
                        .then(_ => resolve(userRecord))
                        .catch(_ => reject("Password is not correct."));
                })
                .catch(_ => reject("Database Error"));
        });
    },
    async createUser(user) {
        const userRecord = await UserModel.create(user);
        if (!userRecord) throw new Error('Failed to create user.');
        return userRecord;
    },
    async updateUser(user) {
        const userRecord = await UserModel.findOneAndUpdate(user);
        if (!userRecord) throw new Error('Failed to create user.');
        return userRecord;
    },
    async getUser(userId) {
        const userRecord = await UserModel.findOne({_id: userId}).populate('courses');
        if (!userRecord) throw new Error('User not found.');
        return userRecord;
    },
    async validateUserId(userId) {
        const userRecord = await UserModel.findById(userId);
        if (!userRecord) throw new Error('Failed to find user');
        return userRecord;
    }
}
