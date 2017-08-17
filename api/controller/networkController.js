const mongoose = require('mongoose');
const Network = mongoose.model('Networks');

class NetworkController {

	static listAllNetworks(req, res) {
		Network.find({})
				.then((data) => {
					res.json(data);
				}).catch((err) => {
					res.send(err);
				});
	}
}

module.exports = NetworkController;