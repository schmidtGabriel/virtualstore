const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// CORS
const cors = require('cors');
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
  