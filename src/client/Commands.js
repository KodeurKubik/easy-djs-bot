'use strict';

let allComs = {}

async function addCommand({ prefix, name, reply, ping, permissions }) {
    if (allComs[prefix + name]) return new Error(`The command ${prefix + name} already exists!`)
    allComs[prefix + name] = { reply, permissions, ping }
}

async function allCommands() {
    return allComs
}


const { Discord, Client, MessageEmbed, Intents } = require('discord.js')

/**
 * 
 * @param {string} token
 */

async function waitForCommand(token) {

    const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_WEBHOOKS] })

    client.on('messageCreate', message => {
        if (allComs[message.content]) {
            let com = allComs[message.content]

            let allPerm = []
            let toDo = true

            if (com.permissions === false) {
                toDo = true
            } else {
                com.permissions.forEach(async e => {
                    allPerm.push(`<@&${e}> `)
                    if (!message.member.roles.cache.find(r => r.id === e)) toDo = false
                })
            }

            if (toDo === false) {
                const errorEmbed = new MessageEmbed()
                    .setDescription('🚫 Permission denied!\nYou need one of this role to access to this command: ' + allPerm)
                message.reply({ embeds: [errorEmbed] })

            } else if (com.ping) {
                message.reply(com.reply)
            } else {
                message.channel.send(com.reply)
            }
        }
    })

    client.on('ready', () => console.log(`Started ${client.user.tag}`))
    client.login(token)
}

exports.waitForCommand = waitForCommand;
exports.allCommands = allCommands;
exports.addCommand = addCommand;
