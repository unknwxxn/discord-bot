const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'профиль',
  description: 'Информация о пользователе',
  aliases: ["profile", "профиль"],
  async execute(bot, message, args, config) {
    message.delete();
    let member = message.mentions.members.first() || message.author
    if (member.bot) return 
    let data = await User.findOne({ guildID: message.guild.id, userID: member.id })
    if (!data) return
    let embed = new MessageEmbed()
        .setColor("#36393E")
        .setThumbnail(member.avatarURL({ size: 1024, dynamic: true }))
        .setDescription(`\`\`\`${data.bio}\`\`\``)
        .setTitle(`Информация о ${member.tag}`)
        .addField('❬☕❭ Статистика', `• Баланс › **${data.money}** 🍬\n• Уровень › **${data.lvl}**  ᅠ \`[ ${data.exp} / ${data.lvl * 120} ]\``)
        .addField('❬☀️❭ Остальное', `• Всего сообщений ›  **${data.messages}**\n• Discord ID › \`${member.id}\``)
        .setFooter({ text: `Выполнил(а) ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ size: 1024, dynamic: true })})
        .setTimestamp()
    message.channel.send({ embeds: [embed] })
  }
}
