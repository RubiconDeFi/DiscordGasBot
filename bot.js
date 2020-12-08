const Discord = require('discord.js');
const fetch = require("node-fetch");
const client = new Discord.Client();
const TOKEN = ""
const api = "https://ethgasstation.info/api/ethgasAPI.json?"

currentPrice = 0

function getPrices() {
  return fetch(api)
    .then(response => response.json())
    .then(data => currentPrice =(data['average']/10));
}

getPrices().then(result => console.log('here', result));

// let response = fetch(api);
//
// if (response.ok) { // if HTTP-status is 200-299
//   // get the response body (the method explained below)
//   let json = response.json();
//   console.log(json)
// } else {
//   console.log("HTTP-Error: " + response.status);
// }

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(currentPrice);
  client.user.setActivity(String(currentPrice + " gwei"), { type: 'WATCHING' });
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});


// client.user.setActivity("with depression", {
//   type: "STREAMING",
//   url: "https://www.twitch.tv/monstercat"
// });

client.login(TOKEN);
