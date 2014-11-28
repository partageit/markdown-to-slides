#!/usr/bin/env node
var path = require('path');
var templateDir = __dirname + '/template';
var optimist = require('optimist')
.alias({
	't': 'title',
	'l': 'template',
	's': 'style',
	'j': 'script',
	'h': 'help',
	'o': 'output-file',
//	'i': 'stdin',
	'w': 'watch',
	'v': 'version',
	'd': 'document-mode'
})
.describe({
	'title': 'Generated page title',
	'style': 'Path to custom stylesheet',
	'script': 'Path to custom javascript',
	'template': 'Path to custom mustache template',
	'help': 'This screen',
	'output-file': 'Path to output file (stdout if not specified)',
	'document-mode': 'Generate slides from a document without slide separators (---) or annotations',
//	'stdin': 'If set, stdin will be used instead of file',
	'watch': 'Watch mode'
})
.boolean('watch')
.boolean('document-mode')
.boolean('version')
.default({
	'style': path.resolve(templateDir + '/style.css'),
	'template': path.resolve(templateDir + '/template.html')
});
var argv = optimist.argv;
if (argv.v) {
	console.log(require('./lib/version-string')());
} else if (argv.h) {
	console.log(require('./lib/help')(optimist));
//} else if (argv.i) {
//	require('./lib/stdio')(argv);
} else if (argv.w) {
	require('./lib/watch')(argv);
} else {
	require('./lib/file')(argv);
}
