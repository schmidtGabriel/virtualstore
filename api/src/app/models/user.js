const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    cpf: {
        type: String,
        lowercase: true
    },
    phone: {
        type: String,
        lowercase: true
    },
    birthday: {
        type: String,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: String,
        select: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;