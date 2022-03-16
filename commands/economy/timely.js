const ms = require('ms');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'бонус',
  description: 'Собрать повременную награду',
  aliases: ["bonus", "бонус"],
  async execute(bot, message, args, config) {
    message.delete();
    let data = await User.findOne({ guildID: message.guild.id, userID: message.author.id });

    if (config.timely > Date.now() - data._time) {
      let time = ms(config.timely - (Date.now() - data._time), {
        secondsDecimalDigits: 0
      });
      let embed = new MessageEmbed()
        .setDescription(`${message.author}, вы уже получали свою награду, приходите снова через **${time}**!`)
        .setColor('#eb5c47')
        .setFooter({ text: `Выполнил(а) ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ size: 1024, dynamic: true })})
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    } else {
      let embed = new MessageEmbed()
        .setDescription(`${message.author}, вы успешно получили свою награду в размере **${config.how}** 🍬`)
        .setColor('#36393E')
        .setFooter({ text: `Выполнил(а) ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ size: 1024, dynamic: true })})
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
      await User.updateOne(
        { guildID: message.guild.id, userID: message.author.id },
        {
          $set: { _time: new Date() },
          $inc: { money: config.how }
        }
      );
    }
  }
}
