const mongoose = require('mongoose');
const Network = mongoose.model('Networks');
const NetworkStation = mongoose.model('NetworksStations');

class NetworkController {

	static listAllNetworks(req, res) {
		Network
		.find({})
		.then((data) => {
			res.json(data);
		}).catch((err) => {
			res.send(err);
		});
	}

	static readNetworkStation(req, res) {
		NetworkStation
		.find({
			id: req.params.id
		}).then((data) => {
			res.json(data);
		}).catch((err) => {
			res.send(err);
		});
	} 
}

module.exports = NetworkController;