'use strict';

const { Client, MessageEmbed, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_WEBHOOKS] })

let allComs = {}
let prefixed = ""
let token = undefined
let on = false

async function setPrefix(newPrefix) { prefixed = newPrefix }
async function setToken(newToken) { token = newToken; client.login(token) }

async function send(channelId, guildId, message) {
    if (token === undefined) throw new Error('The bot must be loged in! Use the bot.setToken(token) function to log your bot in.')
    await client.guilds.cache.find(g => g.id === guildId).channels.cache.find(c => c.id == channelId).send(message)
}
async function editChannel(channelId, guildId, newName) {
    if (token === undefined) throw new Error('The bot must be loged in! Use the bot.setToken(token) function to log your bot in.')
    await client.guilds.cache.find(g => g.id === guildId).channels.cache.find(c => c.id == channelId).edit({ name: newName });
}


async function addCommand({ name, reply, ping, permissions, execute, ignorePause }, prefix) {
    let pref = ""
    if (prefix == true) pref = prefix
    if (prefix == false) pref = ""

    if (allComs[prefixed + name]) throw new Error(`The command ${prefixed + name} already exists!`)
    if (!name.indexOf(' ') === -1) throw new Error(`The the command ${name} cannot contain spaces!`)
    if (!prefixed.indexOf(' ') === -1) throw new Error(`The the prefix ${prefixed} cannot contain spaces!`)

    allComs[prefixed + name] = { reply, permissions, ping, execute, ignorePause }
    console.log(`Created the ${prefixed + name} command!`)
}

async function allCommands() {
    return allComs
}

async function waitForCommand() { on = true; run() }
async function pause() { on = false }
async function unpause() { on = true }

async function run() {
    client.on('messageCreate', async message => {
        if (token === undefined) throw new Error('The bot must be loged in! Use the bot.setToken(token) function to log your bot in.')
        let args = message.content.split(" ")

        if (allComs[args[0]]) {
            let com = allComs[args[0]]

            let allPerm = []
            let toDo = true

            if (on === false && com.ignorePause != true) return

            if (!com.permissions === false) {
                com.permissions.forEach(async e => {
                    allPerm.push(e)
                    if (!message.member.permissions.has(e)) toDo = false
                })
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
                    isNsfw: message.channel.nsfw,
                    parentId: message.channel.parentId
                }
                args.shift()
                if (args.length == 0) args[0] = "No arguments"
                com.execute(author, guild, channel, args)
            }
        }
    })

    client.on('ready', () => console.log(`Started ${client.user.tag}`))
}

exports.waitForCommand = waitForCommand;
exports.pause = pause;
exports.unpause = unpause;
exports.allCommands = allCommands;
exports.addCommand = addCommand;
exports.setPrefix = setPrefix;
exports.setToken = setToken;

exports.sendMessage = send;
exports.editChannel = editChannel;
