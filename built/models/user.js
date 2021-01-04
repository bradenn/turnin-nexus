var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    courses: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Course"
        }],
    password: {
        type: String,
        required: true
    },
    account: {
        type: String,
        enum: ['student', 'ta', 'instructor', 'admin', 'superadmin'],
        default: 'student'
    },
    dateEdited: { type: Date, default: Date.now },
    dateCreated: { type: Date, default: Date.now }
});
userSchema.statics.authenticate = (username, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({ "username": username }).exec().then(user => {
            if (!user) {
                let err = new Error('An account could not be found using that email/password.');
                err.status = 401;
                return reject(err);
            }
            verifyHash(password, user.password).then(() => {
                return resolve(user);
            }).catch((er) => {
                let err = new Error("An account could not be found using that email/password.");
                return reject(err);
            });
        });
    });
};
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = this;
        if (!user.isModified('password'))
            return next();
        user.password = yield hashPassword(user.password);
        next();
    });
});
let hashPassword = (password) => new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
        if (err)
            reject(new Error(err));
        resolve(hash);
    });
});
let verifyHash = (password, original) => new Promise((resolve, reject) => {
    bcrypt.compare(password, original, function (err, result) {
        if (err)
            reject(new Error(err));
        if (result) {
            resolve(result);
        }
        else {
            reject(new Error(err));
        }
    });
});
const User = mongoose.model('User', userSchema);
export default User;
