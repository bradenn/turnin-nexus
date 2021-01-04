import mongoose from 'mongoose';
import config from '../config';
export default () => {
    return new Promise((resolve, reject) => {
        /* MongoDB Connection */
        mongoose.set('useCreateIndex', true);
        /* Define Mongoose Options*/
        const mongooseOptions = {
            useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true
        };
        /* Create Mongoose Connection */
        mongoose.connect(config.MONGO, mongooseOptions)
            .then(mongoose => resolve(mongoose))
            .catch(error => reject(error));
    });
};
