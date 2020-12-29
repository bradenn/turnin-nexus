import {jwtService, userService} from "../services"

export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwtService.verify(token).then(payload => {
            req.userId = payload.userId;
            req.user = payload.user;
            next();
        }).catch(error => {
            return res.status(401).send(error);
        })
    } else {
        return res.status(401).send();
    }
}

export function authenticate(req, res) {
    if (req.body.username && req.body.password) {
        userService.authenticateUser(req.body.username, req.body.password)
            .then(document => {
                jwtService.sign({userId: document._id, user: document})
                    .then(token => {
                        return res.status(200).json({token: token, user: document});
                    })
                    .catch(error => {
                        return res.status(500).json(error);
                    });
            })
            .catch(error => {
                return res.status(401).json(error);
            });
    }
    return res.status(403);

}

export function registerUser(req, res) {
    if (req.body.username && req.body.password && req.body.email && req.body.firstname && req.body.lastname) {
        userService.createUser(req.body)
            .then(document => {
                jwtService.sign({userId: document._id})
                    .then(token => {
                        return res.status(200).json({token: token, user: document});
                    })
                    .catch(error => {
                        return res.status(500).json(error);
                    });
            })
            .catch(error => {
                return res.status(401).json(error);
            });
    }
    return res.status(403);

}

