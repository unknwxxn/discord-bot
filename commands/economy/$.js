const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'баланс',
  description: 'Покажет сколько у тебя 🍬',
  aliases: ["баланс", "balance"],
  async execute(bot, message, args, config) {
    message.delete();
    let member = message.mentions.users.first() || message.author
    if (member.bot) return 
    let data = await User.findOne({ guildID: message.guild.id, userID: member.id })
    if (!data) return 

    let embed = new MessageEmbed()
      .setDescription(`Баланс пользователя ${member} — ${data.money} 🍬`)
      .setColor('#36393E')
      .setFooter({ text: `Выполнил(а) ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ size: 1024, dynamic: true })})
      .setTimestamp()
    message.channel.send({ embeds: [embed] })
  }
}