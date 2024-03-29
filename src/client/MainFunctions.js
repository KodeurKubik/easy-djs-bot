'use strict';

const { Client, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, IntentsBitField } = require('discord.js');
const client = new Client({ intents: Object.keys(IntentsBitField.Flags).filter(i => isNaN(i)) });

var allComs = {};
var prefixed = "";
var token = undefined;
var on = false;
var coms_cat = [];

function setPrefix(newPrefix) { prefixed = newPrefix };
function setToken(newToken) { token = newToken; client.login(token) };

async function send(channelId, guildId, message) {
    if (token === undefined) throw new Error('The bot must be loged in! Use the bot.setToken(token) function to log your bot in.');
    await client.guilds.cache.find(g => g.id === guildId).channels.cache.find(c => c.id == channelId).send(message);
};
async function editChannel(channelId, guildId, newName) {
    if (token === undefined) throw new Error('The bot must be loged in! Use the bot.setToken(token) function to log your bot in.');
    await client.guilds.cache.find(g => g.id === guildId).channels.cache.find(c => c.id == channelId).edit({ name: newName });
};

function setHelpCategory(array) {
    array.forEach((e) => {
        if (!e.name) throw new Error('The category need a name!')
        if (!e.value) throw new Error('The category need a value (a description)!')
        e.inline = false
    });
    coms_cat = array;
};


function addCommand({ name, reply, category, ping, permissions, execute, ignorePause, description }, prefix) {
    let pref = "";
    if (prefix == true) pref = prefix;
    if (prefix == false) pref = "";

    if (allComs[prefixed + name]) throw new Error(`The command ${prefixed + name} already exists!`);
    if (!name.indexOf(' ') === -1) throw new Error(`The the command ${name} cannot contain spaces!`);
    if (!prefixed.indexOf(' ') === -1) throw new Error(`The the prefix ${prefixed} cannot contain spaces!`);
    if (name === prefixed + "help") throw new Error(`The command name cannot be ${prefixed + help}`);

    allComs[prefixed + name] = { name, reply, permissions, category, ping, execute, ignorePause, description };
    console.log(`Created the ${prefixed + name} command!`);
};

function allCommands() {
    return allComs;
};

function waitForCommand() { on = true; run() };
function pause() { on = false };
function unpause() { on = true };

function run() {
    const guild_help = new Map();
    let all_help_choices = [];
    coms_cat.forEach((e) => {
        all_help_choices.push({
            label: e.name,
            description: e.value,
            value: e.name
        });
    });

    client.on('interactionCreate', async interaction => {
        if (interaction.isStringSelectMenu()) {

            if (interaction.customId === interaction.guild.id + "-help") {
                const help_choice_row = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId(`${interaction.guild.id}-help`)
                            .setPlaceholder(interaction.values[0])
                            .addOptions(all_help_choices),
                    );
                let all_coms = ""
                Object.keys(allComs).forEach((i) => {
                    let e = allComs[i]
                    if (e.category === interaction.values[0]) all_coms += `\`${e.name}\`: _${e.description}_ (${!e.permissions.join('') == "" ? e.permissions : "No permission required"})\n`
                })
                const help_actual = new EmbedBuilder()
                    .setTitle("Help \| " + interaction.values[0])
                    .setDescription(all_coms)
                await interaction.update({ embeds: [help_actual], components: [help_choice_row] });
            }
        }
    });
    client.on('messageCreate', async message => {
        if (token === undefined) throw new Error('The bot must be loged in! Use the bot.setToken(token) function to log your bot in.')
        let args = message.content.split(" ")

        if (args[0] === prefixed + "help") {
            let help_embed = new EmbedBuilder()
                .setTitle('Help command')
                .addFields(coms_cat)
            const help_choice_row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId(`${message.guild.id}-help`)
                        .setPlaceholder('Nothing selected...')
                        .addOptions(all_help_choices),
                );

            let msg = message.reply({ embeds: [help_embed], components: [help_choice_row] })
            guild_help.set(message.guild.id, msg.id)
        }
        else if (allComs[args[0]]) {
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
                const errorEmbed = new EmbedBuilder()
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
    });

    client.on('ready', () => console.log(`Started ${client.user.tag}`));
};

module.exports = {
    waitForCommand: waitForCommand,
    pause: pause,
    unpause: unpause,
    allCommands: allCommands,
    addCommand: addCommand,
    setPrefix: setPrefix,
    setToken: setToken,

    sendMessage: send,
    editChannel: editChannel,
    setHelpCategory: setHelpCategory,
};