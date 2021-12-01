'use strict';

const { sendMessage } = require('../client/MainFunctions');

function send(channelId, guildId, message) {
    sendMessage(channelId, guildId, message)
}

exports.send = send;
