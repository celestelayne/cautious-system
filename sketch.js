let dataServer;

let pubKey = config.pubKey;
let subKey = config.subKey;

// interface variables
let sendText;
let sendButton;

// name used to sort your messages. used like a radio station. can be called anything
let channelName = "messageChannel";

// variable that will hold the incoming message text
let incomingText = "";

// create empty variable to store chats
let sending = [];
let receiving = [];

function setup() {
  createCanvas(400, 400);

  // initialize pubnub
  dataServer = new PubNub({
    publish_key: pubKey,
    subscribe_key: subKey,
    ssl: true
  });

  // attach callbacks to the pubnub object to handle messages and connections
  dataServer.addListener(
    { message: readIncoming });
  
  dataServer.subscribe({
    channels: [channelName]
  });

  //create the text fields for the message to be sent
  sendText = createInput();
  sendText.position(25, height - 50);
  
  let col = color(25, 23, 200, 50);
  
  sendButton = createButton('Post Message');
  sendButton.style('background-color', col);
  sendButton.position(sendText.x + sendText.width, height - 50);
  sendButton.mousePressed(sendTheMessage);

}

function readIncoming(inMessage) {
  
  // simple error check to match the incoming to the channelName
  if (inMessage.channel == channelName) {
    incomingText = inMessage.message.messageText;
  }
  
  receiving.push(incomingText)
  console.log(incomingText)
  console.log(receiving)
}

function sendTheMessage() {

  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: {
      messageText: sendText.value() 
    }
  });
  
  let chat = sendText.value() 
  sending.push(chat)
  
  console.log(sending)

}


function draw() {
  let c = color(255, 204, 0);
  background(c);
  
  let y = 10;
  
  // for (let i = 0; i < sending.length; i++) {
  //   text(sending[i], 10, y+=20, 100, 40)
  // }
  
  for (let i = 0; i < receiving.length; i++) {
    textSize(16);
    text(receiving[i], 50, y+=30, 200, 40);
    fill('#d35400');
  }
}