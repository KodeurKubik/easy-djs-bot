'use strict';

// Command
exports.createCommand = require('./client/createCommand');
exports.waitForCommand = require('./client/MainFunctions').waitForCommand;

// Channel
exports.channel = require('./channel/index');

// Utilities
exports.version = require('../package.json').version;
exports.setPrefix = require('./client/MainFunctions').setPrefix;
exports.setToken = require('./client/MainFunctions').setToken;
