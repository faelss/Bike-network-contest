const controller = require('../controller/networkController')

module.exports = function(app) {

	app.route('/networks')
		.get(controller.listAllNetworks);
};