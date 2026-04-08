require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const {commandArray} = require('./commands.js')
const {onlineCommandsArray, getDelayedLastMessage} = require('./contentRetrievalCommands.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on('ready', (c) => {
    const generalChannel = client.channels.cache.get(process.env.CHANNEL_ID);
    generalChannel.send(`${c.user.displayName} is online`);
    console.log(c.user.tag + ' is online');
})


client.on('messageCreate', (message)=>{
    for(let i = 0; i < onlineCommandsArray.length; i++){
        onlineCommandsArray[i](message);
    }
    //console.log(message);
});

client.login(process.env.TOKEN);

//Provides an api to the outside world
const express = require('express');
const app = express();

const port = 3001;

app.listen(port, function(error){
    if (error)
        console.log(error);

    console.log(`Server is listening at port ${port}`);
})

app.get('/test', (req, res) => {
    let storyContentIdParam = req.query['storyContentId'];
    let storyTitleIdParam = req.query['storyTitleId'];

    const generalChannel = client.channels.cache.get(process.env.CHANNEL_ID);
    generalChannel.send(`You are requesting story from story title id ${storyTitleIdParam} with ${storyContentIdParam}`);

    response = {responseContent:`Response was send with storyContentId:${storyContentIdParam} and storyTitleId = ${storyTitleIdParam}`};
    res.send(response);
})

app.get('/getStoryContent',async (req, res) => {
    let storyContentIdParam = req.query['storyContentId'];
    let storyTitleIdParam = req.query['storyTitleId'];

    let discordRequestString = `!s ${storyTitleIdParam} ${storyContentIdParam}`;

    const generalChannel = client.channels.cache.get(process.env.CHANNEL_ID);
    generalChannel.send(discordRequestString);

    response = await getDelayedLastMessage();
    console.log(response);
    res.send(response);
});

const listOfTestStoryTitles = [
    "The Shawshank Redemption",
    "To Kill a Mockingbird",
    "Harry Potter and the Prisoner of Azkaban",
    "The Lord of the Rings: The Fellowship of the Ring",
    "Inception",
    "Dune",
    "The Great Gatsby",
    "Pride and Prejudice",
    "1984",
    "The Godfather"
]

app.get('/getTitles', async (req, res) => {
    // let incomingIndex = parseInt(req.query['incomingIndex']);
    // let incrementAmmount = parseInt(req.query['incrementAmmount']);

    //if (listOfTestStoryTitles[incomingIndex] !== undefined && listOfTestStoryTitles.length > 0){
    //listOfTitlesTemp = [];

    // for(let i = incomingIndex; i < incomingIndex + incrementAmmount; i++){
    //     if (listOfTestStoryTitles[i] !== undefined)
    //         listOfTitlesTemp.push(listOfTestStoryTitles[i]);
    // }

    let incomingIndex = parseInt(req.query['incomingIndex']);
    let incrementAmmount = parseInt(req.query['incrementAmmount']);

    let discordRequestString = `!t ${incomingIndex} ${incrementAmmount}`

    const generalChannel = client.channels.cache.get(process.env.CHANNEL_ID);
    generalChannel.send(discordRequestString);

    response = await getDelayedLastMessage();

    response = response.slice(1);

    console.log(response);

    let listOfTitlesTemp = response.split('|');

    res.send({listOfTitles:listOfTitlesTemp});
    
})