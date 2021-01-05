import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

export default app => {
    return new Promise((resolve) => {

        /* System Health Checks */
        app.route('/status')
            .get((req, res) => res.status(200).end())
            .head((req, res) => res.status(200).end());

        /* Some minor security sanity checks */
        app.use(helmet());

        /* Allow the API to receive JSON */
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));

        /* Allow cross-origin resource sharing */
        app.use(cors());

        /* Helps with reverse proxy */
        app.enable('trust proxy');

        

        resolve(app);
    });
};
