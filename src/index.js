'use strict';

// Command
exports.createCommand = require('./client/createCommand');
exports.waitForCommand = require('./client/Commands').waitForCommand;

// Utilities
exports.version = require('../package.json').version;
