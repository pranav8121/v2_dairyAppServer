let path = require('path');
let express = require('express');
let cors = require('cors');
require("dotenv").config();
let bodyParser = require('body-parser');
// let request = require('request');
let app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '50mb',
    parameterLimit: 1000000
}));

app.use(express.static(path.resolve(__dirname, './panel')));
app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './panel/index.html'));
});

app.listen(3005, () =>
    console.log('App started at port', 3005)
);