'use strict';

module.exports = function (optimist) {
	return require('./version-string.js')() + '\n\n' + optimist.help();
};
