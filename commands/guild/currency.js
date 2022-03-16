
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
module.exports = { 
    name: "currency",
    description: "Команда позволяющая узнать курс валюты на сегоднешний день",
    aliases: ["курс-валют"],
    async execute(bot, message, args, config) {
        message.delete();
        axios.get("https://www.cbr-xml-daily.ru/daily_json.js")
        .then(response => 
            message.channel.send(`Курс валют на сегодняшнее число составляет:\n${response.data.Valute.USD.Name} - ${response.data.Valute.USD.Value} руб.\n${response.data.Valute.EUR.Name} - ${response.data.Valute.EUR.Value} руб.`)
        );
    } 
}
