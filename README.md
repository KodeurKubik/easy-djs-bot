# easy-djs-bot
A simple module that simplify the DiscordJS coding.

## About DiscordJS

discord.js is a powerful [Node.js](https://nodejs.org) module that allows you to easily interact with the
[Discord API](https://discord.com/developers/docs/intro).

- Object-oriented
- Predictable abstractions
- Performant
- 100% coverage of the Discord API

## Installation

**Node.js 16.6.0 or newer is required.**  

__CURRENTLY NOT WORKING__
```sh-session
npm install easy-djs-bot
```

## Example usage

```js
const bot = require('easy-djs');
const token = 'PUT YOUR DISCORD BOT TOKEN HERE';

bot.setPrefix('!')

async function messageArgsEvent(author, channel, guild, args) {
  bot.channel.send(token, channel.id, guild.id, `Pong again, __${author.username}__!\nArguments: ${args[0]}`)
}

bot.createCommad({
  name: 'ping',
  reply: 'Pong!', // Set to false for no reponse
  ping: true,
  permissions: ['role id 1', 'role id 2', '...'], // For no permissions, just set permissions to False.
  execute: messageArgsEvent
}, true); // Set to false for no prefix (only for this command)
```

## Links

- [GitHub](https://github.com/totorogaming/easy-djs-bot)
- [npm SOON](https://www.npmjs.com/package/easy-djs-bot)

## Help

If you don't understand the documentation here or an error has occured, you can report it in this github, send a Discord message to Totoro_Gaming#0243 or send a mail to this email : totorogaming.mc@gmail.com
