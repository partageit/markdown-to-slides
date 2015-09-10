'use strict';

var marked = require('marked');
var path = require('path');
var fs = require('fs');
var mustache = require('mustache');
var mdRenderer = require('marked-to-md');

module.exports = function (argv, md) {
	var tokens = marked.lexer(md);
	// Set title.
	var title = path.basename(argv._[0], path.extname(argv._[0]));
	for (var i = 0; i < tokens.length; i ++) {
		if (tokens[i].type === 'heading') {
			title = tokens[i].text;
			break;
		}
	}
	if (argv.title) {
		title = argv.title;
	}

	if (argv['document-mode']) {
		//console.log(tokens);
		var updatedTokens = [];
		for (i = 0; i < tokens.length; i++) {
			if ((i !== 0) && (tokens[i].type === 'heading') && (tokens[i].depth <= argv.level) && (tokens[i-1].type !== 'hr')) {
				updatedTokens.push({'type': 'hr'});
			}
			if (tokens[i].type === 'heading') {
				if (tokens[i].depth === 1) {
					updatedTokens.push({'type': 'paragraph', 'text': 'class: center, middle, main-title'});
				} else if (tokens[i].depth === 2) {
					if ((i === tokens.length - 1) || (tokens[i+1].type === 'heading')) {
						updatedTokens.push({'type': 'paragraph', 'text': 'class: center, middle, title'});
					}
				}
			}
			updatedTokens.push(tokens[i]);
		}
		updatedTokens.links = tokens.links;
		//console.log(updatedTokens);
		var renderer = mdRenderer(new marked.Renderer());

		var parser = new marked.Parser({renderer: renderer});
		md = parser.parse(updatedTokens);
	}
	//console.log(md);

	var content = md; //marked.parser(tokens);
	// Load style.
	var style = fs.readFileSync(argv.style);
	// Load script
	var script = argv.script ? fs.readFileSync(argv.script) : '';
	// Compile template and pipe it out.
	var rendered = mustache.render(fs.readFileSync(argv.template, 'utf8'), {
		content: content,
		style: style,
		title: title,
		script: script
	});

	// Output
	if (argv['output-file']) {
		fs.writeFileSync(argv['output-file'], rendered, {encoding: 'utf-8'});
		console.log('%s: "%s" written in "%s"', (new Date().toLocaleTimeString()), argv._[0], argv['output-file']);
	} else {
		console.log(rendered);
	}
};
