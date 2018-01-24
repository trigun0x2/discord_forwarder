var Eris = require('eris');
var _ = require('underscore-node');
var fs = require('fs');
var configFile = fs.readFileSync("config.json");
var config = JSON.parse(configFile);
// const LISTEN_CHANNELS = config.channels;
// Test channel: 
const LISTEN_CHANNELS = ["401183538856329216"];
const FORWARD_CHANNEL = config.foward_channel;

var bot = new Eris(config.bot_token);

bot.on("ready", () => {
  console.log('Bot Ready');
});

bot.on('messageCreate', (msg) => {
  if (_.contains(LISTEN_CHANNELS,msg.channel.id)) {
    console.log(msg.channel.name + " - FORWARDED");
    bot.createMessage(FORWARD_CHANNEL, {content: "@everyone FROM **" + msg.channel.name + "**", disableEveryone: false});
    let content = {content: msg.content, disableEveryone: false, tts: false};
    bot.createMessage(FORWARD_CHANNEL, content);
  }
});

bot.connect();