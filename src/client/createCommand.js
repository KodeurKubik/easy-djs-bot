'use strict';

const { addCommand } = require('./MainFunctions')

function createCommand({ name, reply, category, ping, permissions, description, execute, ignorePause }, prefix) {
    addCommand({ name, reply, category, ping, permissions, execute, ignorePause, description }, prefix)
}

module.exports = createCommand;
