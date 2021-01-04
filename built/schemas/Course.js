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
import { getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./User";
let Course = class Course {
};
__decorate([
    Field(),
    prop({ required: true }),
    __metadata("design:type", String)
], Course.prototype, "courseName", void 0);
__decorate([
    Field(),
    prop({ required: true }),
    __metadata("design:type", Number)
], Course.prototype, "courseSection", void 0);
__decorate([
    Field(type => User),
    prop({ required: true, ref: () => User }),
    __metadata("design:type", User)
], Course.prototype, "courseInstructor", void 0);
__decorate([
    Field(),
    prop({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "courseIsLocked", void 0);
__decorate([
    Field(),
    prop({ default: Date.now }),
    __metadata("design:type", String)
], Course.prototype, "dateCreated", void 0);
Course = __decorate([
    ObjectType()
], Course);
export { Course };
export const CourseModel = getModelForClass(Course);
