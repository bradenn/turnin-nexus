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
import { Course } from "./Course";
import { Brief } from "./Brief";
import { StdIOAssignment } from "./StdIOAssignment";
let Assignment = class Assignment {
};
__decorate([
    Field(),
    prop({ required: true }),
    __metadata("design:type", String)
], Assignment.prototype, "assignmentName", void 0);
__decorate([
    Field(type => Course),
    prop({ required: true, ref: () => Course }),
    __metadata("design:type", Course)
], Assignment.prototype, "assignmentCourse", void 0);
__decorate([
    Field(),
    prop({ required: true }),
    __metadata("design:type", String)
], Assignment.prototype, "assignmentDueDate", void 0);
__decorate([
    Field(),
    prop({ required: true }),
    __metadata("design:type", String)
], Assignment.prototype, "assignmentLateDate", void 0);
__decorate([
    Field(),
    prop({ default: false }),
    __metadata("design:type", Boolean)
], Assignment.prototype, "assignmentIsAssigned", void 0);
__decorate([
    Field(),
    prop(),
    __metadata("design:type", Brief)
], Assignment.prototype, "assignmentBrief", void 0);
__decorate([
    Field(type => StdIOAssignment),
    prop({ ref: () => StdIOAssignment }),
    __metadata("design:type", StdIOAssignment)
], Assignment.prototype, "assignmentSpecifications", void 0);
__decorate([
    Field(),
    prop({ default: Date.now }),
    __metadata("design:type", String)
], Assignment.prototype, "dateCreated", void 0);
Assignment = __decorate([
    ObjectType()
], Assignment);
export { Assignment };
export const AssignmentModel = getModelForClass(Assignment);
