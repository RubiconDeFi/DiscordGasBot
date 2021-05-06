const Discord = require('discord.js');
const fetch = require("node-fetch");
const client = new Discord.Client();
const api = "https://ethgasstation.info/api/ethgasAPI.json?";
const csv=require('csvtojson');
const fs = require('fs');
const util = require('util');
var currentPrice = 0;

function getPrices() {
  return fetch(api)
    .then(response => response.json())
    .then(data => currentPrice =(data['average']/10));
};

getPrices().then(result => console.log('here', result));

function setStatus() {
  getPrices().then(
    console.log('setStatus to ', currentPrice + " gwei")).then(
    client.user.setActivity(String(currentPrice + " gwei"), { type: 'WATCHING' })
  );
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(currentPrice);
});

client.on('ready', () => {
  setInterval(() => setStatus(), 60000);
});

client.on('message', msg => {
  if (msg.author.bot ==  true) {return;}
  if (msg.content === 'ping') {
    msg.reply('pong');
  } else if (String(msg.content).toLowerCase().includes('gas')) {
    getPrices().then(
      msg.reply('ETH gas is currently: ' + String(currentPrice + " gwei ⛽"))
      );
  } else if (String(msg.content).includes('wen moon')) {
    msg.reply('Soon :tm:');
  };
});

client.login(process.env.BOT_TOKEN);
