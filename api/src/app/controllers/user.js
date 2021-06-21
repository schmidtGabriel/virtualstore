const express = require('express');
const User = require('../models/User')
const authMiddleware = require('../middlewares/auth')
const message = require("../util/messages");

const router = express.Router();

router.use(authMiddleware)


// get all
router.get('/', async (req, res) => {
    try {
        const data = await User.find();

        return res.send({data});
       
    } catch(err){
        return res.status(400).send(message(1));
    } 
});

// get one
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

         return res.send({user});

    } catch(err){
        return res.status(400).send(message(1));
    }
});

// create
router.post('/', async (req, res) => {

    try {
        if(await User.findOne({email}))
        return res.status(400).send({error: 'User already exists'})

        const user = await User.create(req.body);

        return res.send(message(0,user));
    } catch(err){
        return res.status(400).send(message(1));
    }
});

//update
router.put('/', async (req, res) => {
    try {
         const {_id} = req.body;

        const user = await User.findByIdAndUpdate({_id}, req.body, {new: true} );

        return res.send(message(0, user));

    } catch(err){
        return res.status(400).send(message(1));
    }
});

//delete
router.delete('/:userId', async (req, res) => {

    try {

        const user = await User.findByIdAndRemove(req.params.userId);

        return res.send(message(0));

    } catch(err){
        return res.status(400).send(message(1));
    }
});

module.exports = app => app.use('/user', router);