import {UserModel} from '../schemas/User';

export default {
    authenticateUser(username, password) {
        return new Promise((resolve, reject) => {

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
