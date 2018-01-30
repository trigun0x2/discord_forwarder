var Eris = require('eris');
var _ = require('underscore-node');
var fs = require('fs');
var configFile = fs.readFileSync("config.json");
var config = JSON.parse(configFile);
const LISTEN_CHANNELS = config.channels;
// Test channel:
const FORWARD_CHANNELS = config.forward_channels;

var bot = new Eris(config.bot_token);
var botNewServer = new Eris(config.bot_new_server_token);

bot.on("ready", () => {
  console.log('Bot Ready');
});

botNewServer.on("ready", () => {
  console.log('Bot New Server Ready');
});

bot.on('messageCreate', (msg) => {
  if (_.contains(LISTEN_CHANNELS,msg.channel.id)) {
    console.log(msg.channel.name + " - FORWARDED");
    if (_.includes(msg.content, "discord") || _.includes(msg.content, "t.me")){
      return;
    }
    if (msg.content) {
      let content = {content: msg.content, disableEveryone: false, tts: false};
      botNewServer.createMessage(FORWARD_CHANNELS[msg.channel.id], content);
    }
    if (msg.attachments.length > 0) {
      console.log('forward attachments');
      console.log(msg.attachments);
      _.each(msg.attachments, (attachment) => {
        console.log(attachment);
        botNewServer.createMessage(FORWARD_CHANNELS[msg.channel.id], attachment.url);
      });
    }
  }
});

bot.connect();
botNewServer.connect();
