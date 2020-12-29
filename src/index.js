import config from './config';

import express from 'express';
import loaders from './loaders';

import logger from './loaders/logger';

process.on('unhandledRejection', err => logger.error(`\x1b[1mUnhandled: \x1b[0m${err.message}`))

async function start() {
    const app = express();

    await loaders(app);

    const port = config.PORT;
    app.listen(port, () => logger.info(`Listening on 0.0.0.0:${port}`));


}

export default start();
