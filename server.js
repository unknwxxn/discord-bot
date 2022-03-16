const { Client, Collection, MessageEmbed } = require('discord.js');
const mongoose = require('mongoose')
const ms = require('ms')
const fs = require('fs')
const config = require('./config.json')

const bot = new Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
  ],
});

bot.commands = new Collection()

global.Guild = require("./data/guild.js");
global.User = require('./data/user.js');

mongoose.connect(config.dataURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('К базе данных подключился')
})


fs.readdirSync('./commands').forEach(module => {
  const commandFiles = fs.readdirSync(`./commands/${module}/`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${module}/${file}`);
    command.category = module;
    bot.commands.set(command.name, command);
  }
})

bot.on('ready', () => {
  console.log(`Вошёл под ${bot.user.tag}`)
})

bot.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;

  let user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
  let guild = await Guild.findOne({ guildID: message.guild.id });
  if (!user) {
    User.create({
      guildID: message.guild.id,
      userID: message.author.id
    });
  }
  if (!guild) {
    Guild.create({
      guildID: message.guild.id
    });
  }
  await User.updateOne({ guildID: message.guild.id, userID: message.author.id }, { $inc: { exp: 1 } })
  await User.updateOne({ guildID: message.guild.id, userID: message.author.id }, { $inc: { messages: 1 } })
  if(user.exp >= user.lvl * 120){
    let embed = new MessageEmbed()
      .setDescription(`${message.author}, повысил(а) свой уровень до **${user.lvl+1}**!`)
      .setColor('#36393E')
      .setTimestamp();
    message.channel.send({ embeds: [embed] })
    await User.updateOne({ guildID: message.guild.id, userID: message.author.id }, { $set: { exp: 1 } })
    await User.updateOne({ guildID: message.guild.id, userID: message.author.id }, { $inc: { lvl: 1 } })
  }

  if (!message.content.startsWith(guild.prefix)) return;
  const args = message.content.slice(guild.prefix.length).trim().split(/ +/g);
  const cmdName = args.shift().toLowerCase();
  const command = bot.commands.get(cmdName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
  if (!command) return;
  command.execute(bot, message, args, config);
})

bot.login(config.token)
