const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'казино',
    description: ' Сыграть в казино',
    aliases: ["казино"],
    async execute(bot, message, args, config) {
        message.delete();
        let member = message.author
        if (member.bot) return
        let data = await User.findOne({ guildID: message.guild.id, userID: member.id })
        if (!data) return
        let casinoEmbed = new MessageEmbed()
            .setColor('#36393E')
            .setTitle('Казино')
            .setFooter({ text: `Выполнил(а) ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ size: 1024, dynamic: true })})
            .setTimestamp()
            .setThumbnail(member.avatarURL({ size: 1024, dynamic: true }))
        if (!args.join(' ')) return
        let num = parseInt(args[0]);
        if (!num || num <= 0) return
        if (num > data.money) {
            casinoEmbed.setDescription(`У вас недостаточно денег! Ваш баланс: ${data.money} 🍬`)
            return message.channel.send({ embeds: [casinoEmbed] });
        }
        let fruits = ['🍋', '🍇', '🍓', '🍒', '🍌'], 
            bar = ''
        for (let i = 0; i < 3; i++) {
            let b = Math.floor(Math.random() * (fruits.length - 0)) + 0;
            bar += fruits[b]
        }
        data.money -= num
        data.save()
        for (let i = 0; i < fruits.length; i++) {
            if (bar.indexOf(`${fruits[i]}${fruits[i]}${fruits[i]}`) != -1) {
                casinoEmbed.setDescription(`🔸🎰🎰🎰🔸\n🎰${bar}🎰\n🔹🎰🎰🎰🔹\n\n**Вы выиграли ${num * 5} 🍬 (x5)**`)
                await User.updateOne({ guildID: message.guild.id, userID: message.author.id }, { $inc: { money: num * 2} });
                return message.channel.send({ embeds: [casinoEmbed] });
            } if (bar.indexOf(`${fruits[i]}${fruits[i]}`) != -1) {
                casinoEmbed.setDescription(`🔸🎰🎰🎰🔸\n🎰${bar}🎰\n🔹🎰🎰🎰🔹\n\n**Вы выиграли ${num * 2} 🍬 (x2)**`)
                await User.updateOne({ guildID: message.guild.id, userID: message.author.id }, { $inc: { money: num * 2} });
                return message.channel.send({ embeds: [casinoEmbed] });
            } if (bar.startsWith(fruits[i]) && bar.endsWith(fruits[i])) {
                casinoEmbed.setDescription(`🔸🎰🎰🎰🔸\n🎰${bar}🎰\n🔹🎰🎰🎰🔹\n\n**Вы выиграли ${num * 2} 🍬 (x2)**`)
                await User.updateOne({ guildID: message.guild.id, userID: message.author.id }, { $inc: { money: num * 2} });
                return message.channel.send({ embeds: [casinoEmbed] });
            }
        }
        casinoEmbed.setDescription(`🔸🎰🎰🎰🔸\n🎰${bar}🎰\n🔹🎰🎰🎰🔹\n\n**Вы проиграли ${num} 🍬**`)
        return message.channel.send({ embeds: [casinoEmbed] });
    }
}