import performance from 'performance-now';
import expressLoader from './express';
import mongooseLoader from './mongoose';
import graphQLLoader from './graphql';
import passportLoader from './passport';

let round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

export default app => {
    return new Promise((resolve, reject) => {
        let start = performance(), init = performance();
        expressLoader(app)
            .then(() => {
                console.log(`Express loaded [${round(performance() - start)} ms]`);
                start = performance();
                return mongooseLoader()
            })
            .then(() => {
                console.log(`Mongoose loaded [${round(performance() - start)} ms]`);
                start = performance();
                return passportLoader(app)
            })
            .then(app => {
                console.log(`Passport loaded [${round(performance() - start)} ms]`);
                start = performance();
                return graphQLLoader(app);
            }).then(() => {
            resolve(app);
            console.log(`GraphQL loaded [${round(performance() - start)} ms]`);
            console.log(`All Modules Loaded [${round(performance() - init)} ms]`);
        }).catch(error => {
            console.log(`Caught Exception ${error}`);
            reject(error);
        });
    });
}
