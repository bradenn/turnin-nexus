import {ObjectId} from "mongodb";
import {TestSpecificationModel} from "../schemas/Test";


export default {

    async getTestSpecification(TestSpecificationId: ObjectId) {
        const TestSpecificationRecord = await TestSpecificationModel.findById(TestSpecificationId);
        if (!TestSpecificationRecord) throw new Error('Failed to update Specification');
        return TestSpecificationRecord;
    },

}
