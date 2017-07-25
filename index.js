'use strict';

// jshint -W079
var Promise = require('bluebird');
// jshint +W079

var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var mkdirp = Promise.promisify(require('mkdirp'));
var utf8 = require('utf8');

var argv = require('yargs')
    .usage('Usage: $0 [options]')
    .describe('path', 'Path to desired folder for conversion')
    .alias('p', 'path')
    .describe('output', 'Path to output folder, defaults to parent folder of input folder')
    .alias('o', 'output')
    .help('help')
    .alias('h', 'help')
    .demand(['path'])
    .argv;

require('graceful-fs').gracefulify(fs);

var inputFolderPath = path.join(__dirname, argv.path);
var outputFolderPath = argv.output ? path.join(__dirname, argv.output)
    : path.join(inputFolderPath, '../output');

mkdirp(outputFolderPath).catch(error => { console.log(error); });
