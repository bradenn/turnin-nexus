var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Field, ObjectType } from "type-graphql";
import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Course } from "./Course";
let User = class User {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    Field(),
    Property({ required: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    Field(),
    Property({ required: true }),
    __metadata("design:type", Number)
], User.prototype, "email", void 0);
__decorate([
    Field(),
    Property({ required: true }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    Field(),
    Property({ required: true }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    Field(),
    Property({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Field(type => [Course]),
    Property({ ref: "Course", default: [] }),
    __metadata("design:type", Array)
], User.prototype, "courses", void 0);
__decorate([
    Field(),
    Property({ default: Date.now }),
    __metadata("design:type", String)
], User.prototype, "dateCreated", void 0);
User = __decorate([
    ObjectType()
], User);
export { User };
export const UserModel = getModelForClass(User);
UserModel.statics.authenticate = (username, password) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ "username": username })
            .then(user => {
            if (!user)
                reject(new Error("User not found"));
            verifyHash(password, user.password).then(() => {
                return resolve(user);
            }).catch((er) => {
                let err = new Error("An account could not be found using that email/password.");
                return reject(err);
            });
        });
    });
};
UserModel.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = this;
        if (!user.isModified('password'))
            return next();
        user.password = yield hashPassword(user.password);
        next();
    });
});
