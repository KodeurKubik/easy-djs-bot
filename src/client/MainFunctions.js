'use strict';

let allComs = {}
let prefixed = ""
let token = ""

async function setPrefix(newPrefix) { prefixed = newPrefix }
async function setToken(newToken) { token = newToken }

async function send(channelId, guildId, message) {
    const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_WEBHOOKS] })

    client.on('ready', () => client.guilds.cache.find(g => g.id === guildId).channels.cache.find(c => c.id == channelId).send(message))

    client.login(token)
    return
}


async function addCommand({ name, reply, ping, permissions, execute }, prefix) {
    let pref = ""
    if (prefix == true) pref = prefix
    if (prefix == false) pref = ""

    if (allComs[prefixed + name]) throw new Error(`The command ${prefixed + name} already exists!`)
    if (!name.indexOf(' ') === -1) throw new Error(`The the command ${name} cannot contain spaces!`)
    if (!prefixed.indexOf(' ') === -1) throw new Error(`The the prefix ${prefixed} cannot contain spaces!`)

    allComs[prefixed + name] = { reply, permissions, ping, execute }
    console.log(`Created the ${prefixed + name} command!`)
}

async function allCommands() {
    return allComs
}


const { Client, MessageEmbed, Intents } = require('discord.js')

async function waitForCommand() {

    const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_WEBHOOKS] })

    client.on('messageCreate', async message => {
        const args = message.content.split(/ +/)

        if (allComs[args[0]]) {
            let com = allComs[args[0]]

            let allPerm = []
            let toDo = true

            if (!com.permissions === false) {
                com.permissions.forEach(async e => {
                    allPerm.push(e)
                    if (!message.member.permissions.has(e)) toDo = false
                })
            }

            if (toDo === true && com.execute !== false) {
                const author = {
                    id: message.author.id,
                    username: message.author.username
                }
                const guild = {
                    id: message.guild.id,
                    name: message.guild.name
                }
                const channel = {
                    id: message.channel.id,
                    name: message.channel.name,
                    isNsfw: message.channel.nsfw
                }
                com.execute(author, guild, channel, args)
            }

            if (toDo === false) {
                const errorEmbed = new MessageEmbed()
                    .setDescription('🚫 Permission denied!\nYou need one of this role to access to this command: ' + allPerm.join(' ; '))
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
exports.setPrefix = setPrefix;
exports.setToken = setToken;
exports.sendMessage = send;
