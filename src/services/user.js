import User from '../models/user';
import sessionService from "./session";


export default {
    authenticateUser(username, password) {
        return new Promise((resolve, reject) =>
            User.authenticate(username, password)
                .then(userRecord => resolve(userRecord))
                .catch(error => reject(error)));
    },
    async createUser(user) {
        const userRecord = await User.create(user);
        if (!userRecord) throw new Error('Failed to create user.');
        return userRecord;
    },
    async updateUser(user) {
        const userRecord = await User.findOneAndUpdate(user);
        if (!userRecord) throw new Error('Failed to create user.');
        return userRecord;
    },
    async getUser(userId) {
        const userRecord = await User.findOne({_id: userId}).populate('courses');
        if (!userRecord) throw new Error('User not found.');
        return userRecord;
    },
    async validateUserId(userId) {
        const userRecord = await User.findById(userId);
        if (!userRecord) throw new Error('Failed to find user');
        return userRecord;
    }
}
