require('dotenv').config();
const { Client, Attachment } = require('discord.js');

const client = new Client();
const ENV = process.env;

client.on('ready', () => {
    console.log('=== READY ===');
});

client.on('message', msg => {
    // Ignore messages from bots.
    if (msg.author.bot) {
        return;
    }

    if (msg.guild.id === ENV.FORTIES_GUILD) {
        if (msg.content.includes(ENV.FORTIES_SHOWCASE)) {
            if (msg.attachments.size > 0) {
                msg.attachments.map(each => {
                    const url = each.proxyURL;
                    const attachment = new Attachment(url);

                    console.log(`40s channel posted showcase: ${msg.author.username} ${url}`);
                    client.channels.get(ENV.FORTIES_SHOWCASE).send(`Posted by: ${msg.author}`, attachment);
                });
            }
        }
        if (msg.content.includes(ENV.FORTIES_SOUNDTEST)) {
            const url = msg.content.split(`<#${ENV.FORTIES_SOUNDTEST}> `)[1];

            console.log(`40s channel posted soundtest: ${msg.author.username} ${url}`);
            client.channels.get(ENV.FORTIES_SOUNDTEST).send(`Posted by: ${msg.author}\n${url}`);
        }
        if (msg.content.split(` `)[0] =='?addgb' && msg.channel==ENV.BOT_CHANNEL) {
            if (msg.content.split(` `)[1]=='help') {
                console.log('40s channel posted help addgb')
                client.channels.get(ENV.BOT_CHANNEL).send('?addgb <start date> <end date> <GB Name>')
            }
            else {
                client.channels.get(ENV.BOT_CHANNEL).send("Added GB")
            }
        }

    }
});

client.login(ENV.BOT_TOKEN);