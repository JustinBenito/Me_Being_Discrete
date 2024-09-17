const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const cors=require('cors');
var app = express();

const client = new Client({ intents: 
    [GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,] 
});


client.login('MTI4NDE0NDI4MzMwOTMxNDA0OA.G8aBY3.QZWJ0XVTlZ5M-r30PWFnRHYWrZIc0SjyviyD7g');


app.use(express.json());
app.use(cors());


client.on('messageCreate', async (message) => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Check if the message is "send"
    if (message.content.toLowerCase() === 'send') {
        let guildName = message.guild.name;
        const username = message.author.username;
        guildName=guildName.trim().replace(/\s/g, '');


        // Generate the link with guild name and username
        const link = `http://localhost:3000/${guildName}/${username}`;

        // Send the link to the user
        message.reply(`Here is your link: ${link}`);
    }
});

app.get('/', (req, res) => {
    res.send('Hello World');
} );

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});