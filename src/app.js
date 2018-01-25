var Eris = require('eris');
var _ = require('underscore-node');
var fs = require('fs');
var configFile = fs.readFileSync("config.json");
var config = JSON.parse(configFile);
const LISTEN_CHANNELS = config.channels;
// Test channel:
const FORWARD_CHANNELS = config.forward_channels;

var bot = new Eris(config.bot_token);

bot.on("ready", () => {
  console.log('Bot Ready');
});

bot.on('messageCreate', (msg) => {
  if (_.contains(LISTEN_CHANNELS,msg.channel.id)) {
    console.log(msg.channel.name + " - FORWARDED");
    let content = {content: msg.content, disableEveryone: false, tts: false};
    bot.createMessage(FORWARD_CHANNELS[msg.channel.id], content);
  }
});

bot.connect();
