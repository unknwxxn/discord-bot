const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'аватар',
  description: 'Посмотреть аватар пользователя',
  aliases: ["ава", "ava"],
  async execute(bot, message, args, config) {
    message.delete();
    let mentioned = message.mentions.members.first() || message.member;
    let userpng = mentioned.user.displayAvatarURL({ size: 1024, format : "png"});
    let userjpg = mentioned.user.displayAvatarURL({ size: 1024, format : "jpg"});
    let userwebp = mentioned.user.displayAvatarURL({ size: 1024, format : "webp"});
    const embed = new MessageEmbed()
        .setColor("#36393E")
        .setTitle(`Аватар ${mentioned.user.tag}`)
        .setDescription(`**[png](${userpng}) | [jpg](${userjpg}) | [webp](${userwebp})**`)
        .setImage(mentioned.user.displayAvatarURL({ size: 1024, dynamic : true}))
        .setFooter({ text: `Выполнил(а) ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ size: 1024, dynamic: true })})
        .setTimestamp()
    message.channel.send({ embeds: [embed] });
  }
}