# easy-djs-bot
A simple module that simplify the DiscordJS coding.

## About

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
const bot = require('easy-djs-bot');

const token = "PUT YOUR TOKEN HERE"

bot.createCommand({
  prefix: "!",
  name: "ping",
  reply: "Pong!",
  permissions: ['ROLE 1 ID', 'ROLE 2 ID', '...'] // For no permissions, just set permissions to False.
}, token);
```

## Links

- [GitHub](https://github.com/totorogaming/easy-djs-bot)
- [npm](https://www.npmjs.com/package/easy-djs-bot)

## Help

If you don't understand the documentation here or an error has occured, you can report it in this github or send a Discord message to Totoro_Gaming#0243.
