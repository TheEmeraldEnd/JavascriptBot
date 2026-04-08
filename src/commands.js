//Replys to a message with a command
function replySomething(message, comparisonString, replyString){
    if (message.content === comparisonString)
        message.reply(replyString);
}

const commandArray = [
    (message) => {replySomething(message, 'say ping', '!ping');}
]

//Sends a command to a standalone message called by a function
function sendSomething(channel, messageContent){
    channel.send(messageContent);
}

const awakeArray = [
    (channel) => {sendSomething('up and running');}
]

module.exports = {
    commandArray,
    awakeArray
}