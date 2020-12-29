import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import {verifyToken, authenticate, registerUser} from "../controllers/authentication";

export default app => {
    return new Promise((resolve) => {
        /* System Health Checks */
        app.route('/status')
            .get((req, res) => res.status(200).end())
            .head((req, res) => res.status(200).end());

        /* Allow the API to receive JSON */
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
        app.use(express.static('public'))

        app.use(cors());

        app.route('/register')
            .post(registerUser)
        app.route('/auth')
            .post(authenticate);
        app.all('/graphql', verifyToken);


        /* Helps with reverse proxy */
        app.enable('trust proxy');

        resolve(app);
    });


};
