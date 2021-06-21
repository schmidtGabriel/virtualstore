const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const ImageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    md5:{
        type: String,
        required: true
    },
    img:
    {
        data: Buffer,
        contentType: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


ImageSchema.pre('save', async function(next) {
    next();
})

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;