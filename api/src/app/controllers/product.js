const express = require('express');
const Product = require('../models/Product')
const Image = require('../models/Image')
const ProductImage = require('../models/ProductImage')
const authMiddleware = require('../middlewares/auth')
const message = require("../util/messages");
const router = express.Router();
const uploadController = require("../middlewares/upload");


router.use(authMiddleware)

// get all
router.get('/', async (req, res) => {
    try {
        const data = await Product.find().populate(['category', 'images.product'])
         
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
        
        const product = await Product.findByIdAndUpdate({_id}, req.body, {new: true} ).populate("category");

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

router.post("/image/:id", 
uploadController.uploadImages,
uploadController.resizeImages,
uploadController.getResult);

// router.post('/image/:id', async (req, res) => {
// try{

//     await uploadController.uploadImages();
//     await uploadController.resizeImages();
//     await uploadController.getResult();


//     if (req.files.length <= 0) {
//       return res.send(`You must select at least 1 file.`);
//     }

//    // const image = await Image.create(req.body);

//     const model= {
//         url: image.filename,
//         image: image._id,
//         product: res.params.id,
//     }

    
//     const productImage = await ProductImage.create(model)

//     // const product = await Product.findByIdAndUpdate({_id}, {images: productImage}, {new: true} );


//     return res.send(message(0, productImage));

//     // return res.send(`Files have been uploaded.`);
//   } catch (error) {
//     console.log(error);

//     if (error.code === "LIMIT_UNEXPECTED_FILE") {
//       return res.send("Too many files to upload.");
//     }
//     return res.send(`Error when trying upload many files: ${error}`);
//   }
// });


module.exports = app => app.use('/product', router);