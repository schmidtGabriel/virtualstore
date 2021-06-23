const mongoose = require('mongoose');

const url = process.env.MONGO_URL;

mongoose.connect(url, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;