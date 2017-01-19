'use strict';

var fs = require('fs');
module.exports = function (argv) {
	require('./file')(argv);

	var cb = function () {
		require('./compile')(argv, fs.readFileSync(argv._[0], 'utf-8'));
	};

	fs.watchFile(argv._[0], { interval: 100 }, cb);
	fs.watchFile(argv.style, { interval: 100 }, cb);
};
