const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true
    },
    formattedPrice: {
        type: String,
    },
    code: {
        type: String,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductImage',
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});


ProductSchema.pre('save', async function(next) {
    next();
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;