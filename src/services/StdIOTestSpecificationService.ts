import {ObjectId} from "mongodb";
import {StdIOTestSpecificationModel} from "../schemas/StdIOTestSpecification";


export default {

    async getStdIOTestSpecification(stdIOTestSpecificationId: ObjectId) {
        const stdIOTestSpecificationRecord = await StdIOTestSpecificationModel.findById(stdIOTestSpecificationId);
        if (!stdIOTestSpecificationRecord) throw new Error('Failed to update stdIOSpecification');
        return stdIOTestSpecificationRecord;
    },

}
