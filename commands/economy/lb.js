const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'топ',
    description: 'ТОП-10 пользователей по балансу',
    aliases: ["leaders", "топ"],
    async execute(bot, message, args, config) {
        message.delete();
        let embed = new MessageEmbed(),
            guild = message.guild,
            ranks = await User
                .find({ guildID: guild.id })
                .sort({ money: 'desc' })
                .limit(10),
            i = 1;

        ranks.forEach(rank => {
            let member = guild.members.cache.get(rank.userID);
            if (member) {
                embed.addField(`#${i++} — ${member.user.tag}`, `**${rank.money}  🍬**`, true);
            }
        })
        embed.setTitle("ТОП-10 по балансу")
        embed.setColor("#36393f");
        embed.setFooter({ text: `Выполнил(а) ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ size: 1024, dynamic: true }) })
        embed.setTimestamp();
        message.channel.send({ embeds: [embed] })
    }
}
