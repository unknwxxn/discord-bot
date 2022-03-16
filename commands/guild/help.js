const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    description: "Команда позволяющая узнать описание других, не круто ли?",
    aliases: ["h", "помощь"],
    async execute(bot, message, args, config) {
        message.delete();
        let data = await Guild.findOne({ guildID: message.guild.id })
        let embed = new MessageEmbed()
            .setColor('#36393E')
            .setTitle('Команды для экономики')
            .setDescription(`
        \`${data.prefix}баланс\` › Покажет сколько у тебя 🍬
        \`${data.prefix}бонус\` › Собрать повременную награду
        \`${data.prefix}передать @user кол-во\` › Передать 🍬
        \`${data.prefix}топ\` › Топы пользователей
        \`${data.prefix}био текст\` › Изменить описание профиля
        \`${data.prefix}профиль\` › Информация о тебе
        \`${data.prefix}казино сумма\` › Сыграть в казино`)
        let embed2 = new MessageEmbed()
            .setColor('#36393e')
            .setTitle('Остальные команды')
            .setDescription(`
            \`${data.prefix}аватар\` › Посмотреть аватар пользователя
            \`${data.prefix}инвайт\` › Получить инвайт на бота
            \`${data.prefix}курс-валюты\` › Просмотр курс валюты на данный момент`)
        message.channel.send({ embeds: [embed, embed2] })
    }
};
