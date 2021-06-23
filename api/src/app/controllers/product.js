const express = require('express');
const multer = require('multer');
const Product = require('../models/Product')
const ProductImage = require('../models/ProductImage')
const authMiddleware = require('../middlewares/auth')
const message = require("../util/messages");
const router = express.Router();
const uploadController = require("../middlewares/upload");
const multerConfig = require('../../config/multer');

router.use(authMiddleware)

// get all
router.get('/', async (req, res) => {
    try {
        const data = await Product.find().populate(['category', 'images'])
         
        return res.send({data});
       
    } catch(err){
        return res.status(400).send(message(1));
    } 
});

// get one
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

         return res.send({product});

    } catch(err){
        return res.status(400).send(message(1));
    }
});

// create
router.post('/', async (req, res) => {

    try {
        // req.body.formattedPrice = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(req.body.price/100);

        const product = await Product.create(req.body);

        return res.send(message(0, product));
    } catch(err){
        console.log(err)
        return res.status(400).send(message(1));
    }
});

//update
router.put('/', async (req, res) => {
    try {
         const {_id} = req.body;

        // req.body.formattedPrice = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(req.body.price/100);
        
        const product = await Product.findByIdAndUpdate({_id}, req.body, {new: true} ).populate(["category", "images"]);

        return res.send(message(0, product))

    } catch(err){
        return res.status(400).send(message(1));
    }
});

//delete
router.delete('/:id', async (req, res) => {

    try {

        const product = await Product.findByIdAndRemove(req.params.id);

        return res.send(message(0));

    } catch(err){
        return res.status(400).send(message(1));
    }
});

router.post('/image/:id', multer(multerConfig).single('file'), async (req, res) =>{
   const {originalname: name, size, filename: key} = req.file;

   try {

        const productImage = await ProductImage.create({
            name,
            size,
            key,
            url: '',
            product: req.params.id,
        })

        const addImage = {
            $push: { "images": productImage._id}
        }

        const product = await Product.findByIdAndUpdate(req.params.id, addImage, {new: true} ).populate(["category", "images"]);

        return res.send(message(0,product))

    } catch(err){
        console.log(err)
        return res.status(400).send(message(1));
    }
});

router.delete('/image/:id', async (req, res) => {

    try {

        const productImage = await ProductImage.findByIdAndRemove(req.params.id);

        const deleteImage = {
            $pull: { "images": productImage._id}
        }

        const product = await Product.findByIdAndUpdate(productImage.product, deleteImage).populate(["category", "images"]);

        return res.send(message(0, product));

    } catch(err){
        return res.status(400).send(message(1));
    }
});


module.exports = app => app.use('/product', router);