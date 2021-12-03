'use strict';

const { editChannel } = require('../client/MainFunctions');

function edit(channelId, guildId, newName) {
    editChannel(channelId, guildId, newName)
}

module.exports = edit
