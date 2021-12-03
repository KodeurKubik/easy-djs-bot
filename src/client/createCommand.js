'use strict';

const { addCommand } = require('./MainFunctions')

async function createCommand({ name, reply, ping, permissions, execute, ignorePause }, prefix) {
    addCommand({ name, reply, ping, permissions, execute, ignorePause }, prefix)
}

module.exports = createCommand;
