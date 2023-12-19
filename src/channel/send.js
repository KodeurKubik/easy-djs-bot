'use strict';

const { sendMessage } = require('../client/MainFunctions');

async function send(channelId, guildId, message) {
    return await sendMessage(channelId, guildId, message)
}

module.exports = send
