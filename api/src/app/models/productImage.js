const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const ProductImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    image:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


ProductImageSchema.pre('save', async function(next) {
    next();
})

const ProductImage = mongoose.model('ProductImage', ProductImageSchema);

module.exports = ProductImage;