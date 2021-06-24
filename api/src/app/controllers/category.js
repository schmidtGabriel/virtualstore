const express = require('express');
const Category = require('../models/Category')
const authMiddleware = require('../middlewares/auth')
const message = require("../util/messages");

const router = express.Router();

router.use(authMiddleware)

// get all
router.get('/', async (req, res) => {
    try {
        const data = await Category.find();

        return res.send({data});
       
    } catch(err){
        return res.status(400).send(message(1));
    } 
});

// get one
router.get('/:id', async (req, res) => {
    try {
        const data = await Category.findById(req.params.id);

         return res.send({data});

    } catch(err){
        return res.status(400).send(message(1));
    }
});

// create
router.post('/', async (req, res) => {

    try {
       
        const category = await Category.create(req.body);

        return res.send(message(0, category));
    } catch(err){
        return res.status(400).send(message(1));
    }
});

//update
router.put('/', async (req, res) => {
    try {
         const {_id} = req.body;

        const category = await Category.findByIdAndUpdate({_id}, req.body, {new: true} );

        return res.send(message(0, category))

    } catch(err){
        return res.status(400).send(message(1));
    }
});

//delete
router.delete('/:id', async (req, res) => {

    try {

        const category = await Category.findByIdAndRemove(req.params.id);

        return res.send(message(0));

    } catch(err){
        return res.status(400).send(message(1));
    }
});

module.exports = app => app.use('/category', router);