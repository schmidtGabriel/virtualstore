const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const ProductImageSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    size:{
        type: Number,
    },
    key:{
        type: String,
    },
    url:{
        type: String,
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


ProductImageSchema.pre('save', async function(next) {
    if(!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
    
    next();
})

const ProductImage = mongoose.model('ProductImage', ProductImageSchema);

module.exports = ProductImage;