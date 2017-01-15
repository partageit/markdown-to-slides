# Markdown to slides

> A command line interface to convert markdown documents to an HTML slideshow

## Firstly, a markdown to slides converter, using remark

Basically, Markdown to slides uses [remark](https://github.com/gnab/remark) to convert your markdown documents to HTML slideshows, i.e. that can be viewed in your favorite modern Web browser.

The **produced HTML file is standalone** and can be copied, send by mail, ...

If you want to have an idea of what remark does, take a look at the [demo page](http://remarkjs.com/#1).

The **presenter mode** is a great feature, have you tried to press 'P' on the demo page ?

Moreover, writing markdown documents for slideshows is easy:

```markdown
#Main title

---
## First chapter

---
### Chapter 1.1

Some content

---
### Chapter 1.2

Some content

---
## And so on...
```

Each slide must be separated with '---'. Take a look at the [remark wiki](https://github.com/gnab/remark/wiki) for further details.

## The document mode: convert markdown documents not aimed to slides

Sometimes, when you write a document with markdown, you may want to transform it as slides, even if it was not the aim.

An obvious document structure is:

```markdown
# Main document title

## First chapter

### Chapter 1.1

Some content

### Chapter 1.2

Some content

## Second chapter

This chapter does not have sub sections

## And so on...
```

Usually, remark needs slides to be separated with `---`.

This is where the document mode comes: enable the `--document-mode flag` (or `-d`), and slides are splitted automatically, based on the heading structure.

With the previous example:

- the document title (`#`) is decorated as the main title
- chapter titles of the second level (`##`) without direct content (here: the 'First chapter') are on their own slides
- sub chapter titles (`###`) have their own slide.

Headings with level 4 (`####`) or above can be splitted on new slides thanks to the `--level` parameter.

This is not as extensible as the remark syntax, with slides properties (e.g. `class: middle` or `name:`), but it prevent from thinking to the slideshow when writing a document.

## Installation

    $ npm install markdown-to-slides -g

Then you will be able to generate slides from your markdown files from command line.

## Usage

### Basic usage

    $ markdown-to-slides my-file.md -o slideshow.html

Write `my-file.md`, correctly formated to be converted as slides, as `slideshow.html`.

    $ markdown-to-slides -d my-file.md -o slideshow.html

The same, enabling the document mode.

### Options

```
--title, -t          Generated page title
--style, -s          Path to custom stylesheet
--script, -j         Path to custom javascript
--template, -l       Path to custom mustache template
--help, -h           This screen
--output-file, -o    Path to output file (stdout if not specified)
--document-mode, -d  Generate slides from a document without slide separators (---) or annotations
--watch, -w          Watch mode
--level              Heading level to use as new slides (for example 3 is ###)
--include-remark -i  Include Remark sources (around 850kB) into the generated document
```

## Notes

### Inspiration

markdown-to-slides is very inspired from [markdown-html](https://github.com/fragphace/markdown-html/), it is a great tool to convert markdown to HTML.

### Related project

[Vegetables](http://partageit.github.io/vegetables/) is a static Web site generator, turning Markdown documents into HTML pages.

It can produce many versions of the same document, especially a slideshow version, using remark.

In other words, it is like markdown-to-slides, but for many documents at once, with a serve mode, a menu to navigate between documents and auto reload when a document is updated.

## Todo

- validate that md file exists
- split big slides
- handle foot notes (from additional file?)

## Changelog

### Version 1.0.5

- `index.js` changed to `LF` instead of `CRLF` to prevent from `env: node\r: No such file or directory` on mac os X (#12 and #13).

### Version 1.0.4

- Remark source protocol changed from HTTP to HTTPS thanks to [Kotaro Yoshimatsu](https://github.com/ktrysmt)

### Version 1.0.3

- Include remark script statically in compiled HTML. Thank you [Matt Kantor](https://github.com/mkantor)
- As the generated file grows (around takes 850kB) when including the remark script, this enhancement must be enabled with the `--include-remark` parameter

### Version 1.0.2

- It is possible to choose the heading level (default was 3, i.e. `###`) to split slides (#2)
- write() deprecation message removed, migrating mustache renderer from mu2 to mustache (#3)

### Version 1.0.1

- One line code CSS enhanced
- marked-to-md used: tables and list are now correctly handled

## [License](LICENSE)
