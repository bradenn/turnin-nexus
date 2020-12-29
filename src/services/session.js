import {Session} from '../models/session';
import {v4} from "uuid";

export default {
    createSession(userId) {
        return Session.create({sessionOwner: userId, sessionToken: v4()})
    },
    async getSession(sessionId) {
        const sessionRecord = await Session.findOne({_id: sessionId}).populate('sessionOwner');
        if (!sessionRecord) throw new Error('User not found.');
        return sessionRecord;
    }
}
