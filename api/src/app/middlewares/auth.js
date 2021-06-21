const jwt = require('jsonwebtoken');
const auth = require('../../config/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader)
    return res.status(401).send({error: 'No token provider'})

    const parts = authHeader.split(' ');

    if(!parts.module === 2)
    return res.status(401).send({error: 'Token Error'})

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
    return res.status(401).send({error: 'Token bad formatted'})

    jwt.verify(token, auth.secret, (err, decoded) => {
        if(err) return status(401).send({error: 'Token invalid'})


        req.userId = decoded.id;
        return next();
    })
}