const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Network = require('./api/model/networksModel');
const route = require('./api/route/networkRoute');

let port = process.env.PORT || 8000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/networkBike', { useMongoClient: true});

app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

route(app);

app.get('/', (req, res, next) => {
	res.send('Network API !');
});

app.listen(port, () => {
	console.log('Server started on: ' + port);
});