const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'передать',
    description: 'Передать 🍬',
    aliases: ["transfer", "передать"],
    async execute(bot, message, args, config) {
        message.delete();
        let member = message.mentions.users.first()
        if (!member || member.bot || member.id == message.author.id) return

        let author = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
        let loc = await User.findOne({ guildID: message.guild.id, userID: member.id });
        let num = parseInt(args[1]);
        if (!author.money || isNaN(num) || num < 1 || num > author.money) return
        let embed = new MessageEmbed()
            .setDescription(`${message.author}, вы передали **${num}** 🍬 пользователю ${member}`)
            .setColor('#36393E')
            .setFooter({ text: `Выполнил(а) ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setTimestamp();
        message.channel.send({ embeds: [embed] })
        author.money -= num
        loc.money += num
        author.save();
        loc.save()
    }
}
