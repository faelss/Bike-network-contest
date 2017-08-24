const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Network = require('./api/model/networksModel');
const NetworkStation = require('./api/model/networkStationsModel');
const route = require('./api/route/networkRoute');

let port = process.env.PORT || 8000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/networkBike', { useMongoClient: true});

app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

route(app);

app.listen(port, () => {
	console.log('Server started on: ' + port);
});