'use strict';

var pkg = require('../package');
module.exports = function () {
	return pkg.name + ' v' + pkg.version;
};
