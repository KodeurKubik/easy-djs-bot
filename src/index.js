'use strict';

// Command
exports.createCommand = require('./src/client/createCommand');
exports.waitForCommand = require('./src/client/MainFunctions').waitForCommand;

// Channel
exports.channel = require('./src/channel/index');

// Utilities
exports.version = require('../package.json').version;
exports.setPrefix = require('./src/client/MainFunctions').setPrefix;
exports.setToken = require('./src/client/MainFunctions').setToken;
