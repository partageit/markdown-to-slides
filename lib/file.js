'use strict';

var fs = require('fs');
var compile = require('./compile');
module.exports = function (argv) {
	require('../lib/validate')(argv);
	if (!argv._[0]) {
		return;
	}
	compile(argv, fs.readFileSync(argv._[0], 'utf-8'));
};
