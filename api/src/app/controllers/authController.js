const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const auth = require('../../config/auth');
const User = require('../models/User')
const authMiddleware = require('../middlewares/auth')

const router = express.Router();


function generateToken(params = {}){
    const token = jwt.sign(params, auth.secret, {
        expiresIn: 999999,
    })

    return token
}

router.get('/me',authMiddleware, async (req, res) => {

    try{
    const user = await User.findById(req.userId);

    if(!user)
    return res.status(400).send({error: 'User not found'})

    return res.send({user, token: generateToken({id: user.id})});

    }catch(err){
        return res.status(400).send({error: 'Basic Error'})

    }
})

router.post('/register', async (req, res) => {
    const {email} = req.body;

    try {
        if(await User.findOne({email}))
            return res.status(400).send({error: 'User already exists'})
        

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({user, token: generateToken({id: user.id})})
    } catch(err){
        return res.status(400).send({error: 'Registration Failed'})
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try{
    const user = await User.findOne({email}).select('+password');

    if(!user)
    return res.status(400).send({error: 'User not found'})

    if(!await bcrypt.compare(password, user.password))
    return res.status(400).send({error: 'Invalid password'})

    user.password = undefined;

    res.send({user, token: generateToken({id: user.id})});

    }catch(err){
        return res.status(400).send({error: 'Basic Error'})

    }
})



router.post('forgot_password', async (req, res) => {
    const {email} = req.body;

    try{

        const user = await User.findOne({email});

        if(!user)
        return res.status(400).send({error: 'User not found'})

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now
            }
        });

    

    }catch(err){
        return res.status(400).send({error: 'Invalid password'})

    }

})

module.exports = app => app.use('/auth', router);