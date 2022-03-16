const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Посмотреть аватар пользователя',
    aliases: ["инвайт"],
    async execute(bot, message, args, config) {
        message.delete();
        let embed = new MessageEmbed()
            .setColor("#36393E")
            .setDescription("Дискорд бот, который имеет небольшое количество полезных команд для вашего сервера.")
            .addFields(
                {
                    name: '∙ Сделан с помощью',
                    value: 'Node.js v16.13.1\nDiscord.js 13.6.0',
                    inline: true
                },
                {
                    name: '∙ Владелец/Разработчик бота',
                    value: 'unknwxxn#7161',
                    inline: true
                },
                {
                    name: '∙ Ссылка на приглашение',
                    value: '[Приглашение](https://discord.com/oauth2/authorize?client_id=948461525163708458&scope=bot&permissions=334621759)',
                    inline: true
                },
            )
            .setThumbnail(bot.user.displayAvatarURL({ size: 1024, dynamic: true }))
        message.channel.send({ embeds: [embed] });
    }
}