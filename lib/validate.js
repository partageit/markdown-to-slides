'use strict';

var fs = require('fs');
module.exports = function (argv) {
	if (!fs.existsSync(argv.template)) {
		throw new Error('Template does not exist.');
	}
	if (!fs.existsSync(argv.style)) {
		throw new Error('Style does not exist.');
	}
	if (argv.script && !fs.existsSync(argv.script)) {
		throw new Error('Script does not exist.');
	}
};
