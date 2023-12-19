'use strict';

const { editChannel } = require('../client/MainFunctions');

async function edit(channelId, guildId, newName) {
    return await editChannel(channelId, guildId, newName)
}

module.exports = edit
