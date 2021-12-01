'use strict';

const { addCommand } = require('./MainFunctions')

async function createCommand({ name, reply, ping, permissions, execute}, prefix) {
    addCommand({ name, reply, ping, permissions, execute }, prefix)
}

module.exports = createCommand;
