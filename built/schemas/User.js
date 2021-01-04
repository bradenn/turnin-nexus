var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, ObjectType } from "type-graphql";
import { getModelForClass, pre, prop as Property } from "@typegoose/typegoose";
import { Course } from "./Course";
import bcrypt from "bcrypt";
function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err)
                reject(new Error(err));
            resolve(hash);
        });
    });
}
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
    Field(),
    Property({ required: true, default: 'student' }),
    __metadata("design:type", String)
], User.prototype, "account", void 0);
__decorate([
    Field(type => [Course], { nullable: true }),
    Property({ ref: "Course", default: [] }),
    __metadata("design:type", Array)
], User.prototype, "courses", void 0);
__decorate([
    Field(),
    Property({ default: Date.now }),
    __metadata("design:type", String)
], User.prototype, "dateCreated", void 0);
User = __decorate([
    ObjectType(),
    pre('save', function (next) {
        let user = this;
        if (!user.isModified('password'))
            return next();
        hashPassword(user.password).then(hash => {
            user.password = hash;
            next();
        }).catch(_ => {
        });
    })
], User);
export { User };
export const UserModel = getModelForClass(User);
