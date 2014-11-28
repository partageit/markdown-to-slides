'use strict';

var fs = require('fs');
module.exports = function (argv) {
	require('./file')(argv);
	fs.watchFile(argv._[0], { interval: 100 }, function () {
		require('./compile')(argv, fs.readFileSync(argv._[0], 'utf-8'));
	});
};
