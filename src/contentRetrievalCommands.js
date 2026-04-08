//Set up the stuff for the commands to work
var lastMessage;

function registerLastMessage(message, prefix){
    let messageContents = message.content;
    if (messageContents.includes(prefix)){
        console.log(messageContents);
        lastMessage = messageContents;
    }
}

async function getDelayedLastMessage(){
    await new Promise(resolve => setTimeout(resolve, 1000));
    return lastMessage;
}

const onlineCommandsArray = [
    (message) => registerLastMessage(message, '{'),
    (message) => registerLastMessage(message, '|')
];

module.exports = {
    onlineCommandsArray,
    getDelayedLastMessage
}