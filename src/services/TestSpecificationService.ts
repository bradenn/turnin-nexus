import {ObjectId} from "mongodb";
import {TestSpecificationModel} from "../schemas/TestSpecification";


export default {

    async getTestSpecification(TestSpecificationId: ObjectId) {
        const TestSpecificationRecord = await TestSpecificationModel.findById(TestSpecificationId);
        if (!TestSpecificationRecord) throw new Error('Failed to update Specification');
        return TestSpecificationRecord;
    },

}
