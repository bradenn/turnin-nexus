import config from './config';

import express from 'express';
import loaders from './loaders/index';



async function start() {
    const app = express();

    await loaders(app)

    const port = config.PORT;
    app.listen(port, () => console.log(`Listening on 0.0.0.0:${port}`));


}

export default start();
