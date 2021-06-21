const mongoose = require('../../database');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

CategorySchema.pre('save', async function(next) {
    next();
})

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;