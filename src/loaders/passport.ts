import passport from "passport";
import BearerStrategy from "passport-http-bearer";
import LocalStrategy from "passport-local";
import jwtService from "../services/JwtService";
import userService from "../services/UserService";
import {User, UserModel} from "../schemas/User";
import {JwtPayload} from "../schemas/Interfaces";


export default (app) => {
    return new Promise((resolve) => {

        /* Serializing & Deserializing the User*/
        passport.serializeUser((user, done) => {
            return done(null, user._id)
        });

        passport.deserializeUser((id, done) => {
            UserModel.findById(id, (err, user) => done(err, user));
        });

        /* Defining Passport Login Strategies */
        passport.use('register', new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true // I couldn't find this in the LocalStrategy Modules, but oh well
            },
            async (req, username, password, done) => {
                try {
                    const userRecord = await userService.createUser(
                        {
                            username: username,
                            password: password,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                        });
                    console.log("Created User")
                    return done(null, userRecord, {message: 'ok'});
                } catch (error) {
                    console.log(error)
                    return done(null, false, {message: error});
                }
            }));

        passport.use('login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done) => {
            userService.authenticateUser(username, password)
                .then(userRecord => done(null, userRecord, {message: "success"}))
                .catch(error => done(null, false, {message: error}))
        }));

        passport.use('jwt', new BearerStrategy((token, done) => {
            jwtService.verify(token)
                .then(payload => {
                    userService.getUser(payload.userId)
                        .then(userRecord => {
                            done(null, userRecord, {message: "success"})
                        })
                        .catch(error => {
                            done(null, false, {message: "Failed to find user."})
                        })
                })
                .catch(error => {
                    done(null, false, {message: "Invalid JWT Signature, access denied."})
                })
        }));

        /* Passport Express Integration */
        app.use(passport.initialize());
        app.use(passport.session());

        /* Passport Routes */
        app.post('/auth/login', passport.authenticate('login'), (req, res) => {
            const userRecord: User = req.user;
            let payload: JwtPayload = {
                userId: userRecord._id,
                user: userRecord
            };
            jwtService.sign(payload)
                .then(token => {
                    return res.json({token: token, user: payload.user})
                })
                .catch(error => {
                    return res.json({message: error})
                });
        });

        /* Passport Routes */
        app.post('/auth/register', passport.authenticate('register'), (req, res) => {
            const userRecord: User = req.user;
            let payload: JwtPayload = {
                userId: userRecord._id,
                user: userRecord
            };
            jwtService.sign(payload)
                .then(token => {
                    return res.json({token: token, user: payload.user})
                })
                .catch(error => {
                    return res.json({message: error})
                });
        });

        app.get('/auth/token', passport.authenticate('jwt', {}, (req, res) => {
            return res.status(200).json({token: req.session});
        }));

        app.get('/auth/status', (req, res) => {
            if (req.isAuthenticated) return res.status(200).json({token: req.session});
            else return res.status(401).json({message: "Not authenticated."});
        });

        app.get('/auth/logout', (req, res) => {
            req.logout();
            return res.status(200).json({message: "ok"});
        });

        app.all('/graphql', passport.authenticate('jwt'), (req, res, next) => {
            if (req.isAuthenticated) return next();
            else return res.status(401).json({message: "Authentication Required."})

        });

        resolve(app);
    });
};
