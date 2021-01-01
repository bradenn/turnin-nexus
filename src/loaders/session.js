import passport from "passport";
import LocalStrategy from "passport-local";
import BearerStrategy from "passport-http-bearer";
import User from "../models/user";
import {jwtService, userService} from "../services";


export default (app) => {
    return new Promise((resolve) => {

        passport.serializeUser(function (user, done) {
            done(null, user._id);
        });

        passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, user) {
                done(err, user);
            });
        });

        passport.use('login',
            new LocalStrategy(
                {
                    usernameField: 'username',
                    passwordField: 'password'
                },
                (username, password, done) => {
                    User.authenticate(username, password)
                        .then(userRecord => {

                            done(null, userRecord, {message: "success"})

                        })
                        .catch(error => {
                            done(null, false, {message: error})
                        })
                }));

        passport.use('register',
            new LocalStrategy(
                {
                    usernameField: 'username',
                    passwordField: 'password'
                },
                (req, username, password, done) => {
                    return userService.createUser(
                        {
                            username: username,
                            password: password,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                        })
                        .then(userRecord => done(null, userRecord, {message: 'ok'}))
                        .catch(error => done(null, false, {message: error}))
                }));


        passport.use('jwt',
            new BearerStrategy(
                (token, done) => {
                    jwtService.verify(token)
                        .then(payload => {
                            userService.getUser(payload.userId)
                                .then(userRecord => {
                                    done(null, userRecord, {message: "success"})
                                })
                                .catch(error => {
                                    done(null, false, {message: error})
                                })
                        })
                        .catch(error => {
                            done(null, false, {message: error})
                        })
                }));


        app.use(passport.initialize());
        app.use(passport.session());

        app.get('/auth/login', passport.authenticate('login'), (req, res) => {
            const userRecord = req.user;
            let payload = {
                userId: userRecord._id,
                user: {
                    username: userRecord.username,
                    firstname: userRecord.firstname,
                    lastname: userRecord.lastname,
                    email: userRecord.email,
                    account: userRecord.account
                }
            };
            jwtService.sign(payload)
                .then(token => {
                    return res.json({token: token, user: payload.user})
                })
                .catch(error => {
                    return res.json({message: error})
                });

        });

        app.get('/auth/token', passport.authenticate('jwt'), (req, res) => {
            return res.status(200).json(req.session);
        });

        app.get('/auth/status', (req, res) => {
            if (req.isAuthenticated()) return res.status(200).json({session: req.session});
            else return res.status(401).json({message: "Not authenticated."});
        });

        app.get('/auth/logout', (req, res) => {
            req.logout();
            return res.status(200).json({message: "ok"});
        });

        app.all('/graphql', passport.authenticate('jwt'));


        resolve(app);
    });
};
