var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Model } from "mongoose";
import { getClassForDocument } from "@typegoose/typegoose";
export const TypegooseMiddleware = (_, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield next();
    if (Array.isArray(result)) {
        return result.map(item => (item instanceof Model ? convertDocument(item) : item));
    }
    if (result instanceof Model) {
        return convertDocument(result);
    }
    return result;
});
function convertDocument(doc) {
    const convertedDocument = doc.toObject();
    const DocumentClass = getClassForDocument(doc);
    Object.setPrototypeOf(convertedDocument, DocumentClass.prototype);
    return convertedDocument;
}
