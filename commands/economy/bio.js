const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'био',
  description: 'Изменить описание профиля',
  aliases: ["био"],
  async execute(bot, message, args, config) {
    message.delete();
    let biography = args.slice(0).join(' ');
    if (!biography) {
      let embed = new MessageEmbed()
        .setDescription(`${message.author}, вы не указали описание профиля!`)
        .setColor(`#eb5c47`)
        .setFooter({ text: `Выполнил(а) ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setTimestamp()
      message.channel.send({ embeds: [embed] })
    } else {
      let embed = new MessageEmbed()
        .setDescription(`${message.author}, описание профиля установлено!`)
        .setColor(`#36393e`)
        .setFooter({ text: `Выполнил(а) ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setTimestamp()
      message.channel.send({ embeds: [embed] })
      await User.updateOne(
        { guildID: message.guild.id, userID: message.author.id },
        { $set: { bio: biography } }
      );
    }
  }
}
