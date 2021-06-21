const mongoose = require('mongoose');

const url = 'mongodb://localhost/virtualstore';

mongoose.connect(url, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;