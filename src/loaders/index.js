import performance from 'performance-now';
import expressLoader from './express.js';
import mongooseLoader from './mongoose.js';
import graphQLLoader from './graphql.js';
import logger from './logger';

let round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

export default async app => {
    let start = performance();
    expressLoader(app)
        .then(() => {
            logger.info(`Express loaded [${round(performance() - start)} ms]`);
        });

    start = performance();
    graphQLLoader(app)
        .then(() => {
            logger.info(`GraphQL loaded [${round(performance() - start)} ms]`);
        });

    start = performance();
    mongooseLoader()
        .then(() => {
            logger.info(`Mongoose loaded [${round(performance() - start)} ms]`);
        });
}
