require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require("path");
const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

// CORS
app.use(cors());
app.options('*', cors());


// import all routes
require('./app/controllers/index')(app);

app.get('/', async (req, res) => {
    try {
        return res.send("Working")
    } catch(err){
        return res.status(400).send({error: 'Failed'})
    }
});

//app.listen(3000);
app.listen(3000, function () {
    console.log('APP listening on port 3000')
  });
  