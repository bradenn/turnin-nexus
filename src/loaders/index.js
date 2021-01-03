import performance from 'performance-now';
import expressLoader from './express.js';
import mongooseLoader from './mongoose.js';
import graphQLLoader from './graphql.js';
import passportLoader from './passport.js';
import logger from './logger';

let round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

export default async app => {
    return new Promise((resolve, reject) => {
        let start = performance(), init = performance();
        expressLoader(app)
            .then(() => {
                logger.info(`Express loaded [${round(performance() - start)} ms]`);
                start = performance();
                return mongooseLoader()
            })
            .then((mongoose) => {
                logger.info(`Mongoose loaded [${round(performance() - start)} ms]`);
                start = performance();
                return passportLoader(app, mongoose)
            })
            .then(app => {
                logger.info(`Passport loaded [${round(performance() - start)} ms]`);
                start = performance();
                return graphQLLoader(app);
            }).then(() => {
            logger.info(`GraphQL loaded [${round(performance() - start)} ms]`);
            logger.info(`All Modules Loaded [${round(performance() - init)} ms]`);
            resolve();
        }).catch(error => {
            logger.error(`Caught Exception ${error}`);
            reject(error);
        });
    });
}
