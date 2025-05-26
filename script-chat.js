
const chatContainer = document.querySelector('.chat-container')
const botBox = document.querySelector('.bot');
const userBox = document.querySelector('.user');
const sendButton = document.getElementById('submit');
const userInput = document.getElementById('user-input');

// Import the API key from config.js
import { API_KEY } from "./config.js";

const apiKey = API_KEY; 
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

async function getAIResponse(prompt){
 
    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            //body is data that we send, when send data through HTTP ,fetch(), API, must be (string)
        body: JSON.stringify({
            contents: [
            {
                parts: [
                { text: prompt } // user input prompt
                ]
            }
            ]
        })
        });

        if (!response.ok) {
        throw new Error(`Response failed, status ${response.status}`);
        }

        const data = await response.json();
        console.log("Response OK", data);

        const aiReply = data.candidates[0].content.parts[0].text;  // look from console at content, parts text path
        console.log("AI response", aiReply);

        return aiReply;
    
    } catch (error) {
        console.error("Error getAIResponse", error);
    }
    }

    // first bot message appear when getting to chat
function botGreet() {
    const botAvatar = document.querySelector('.avatar');
    const botEmpty  =  botBox.textContent === "" || botBox.classList.contains('hidden');
    const userEmpty =  userBox.textContent === ""|| userBox.classList.contains('hidden');

    if(botEmpty && userEmpty){
        if (botAvatar){
        botAvatar.classList.remove('hidden');
    }
       if(botBox) {
        botBox.textContent = "Hi there!, how can I help you today?";
        botBox.classList.remove('hidden');
    }
   }
}
botGreet();

function removeMarkdown(text) { 

     return text.replace(/[_*~`]/g, '')           // remove _, *, ~, `
                .replace(/#+\s/g, '')             // remove # headings
                .replace(/>\s?/g, '')             // remove blockquotes
                .replace(/!\[.*?\]\(.*?\)/g, '')  // remove images
                .trim();     
}

// message interaction
async function displayMessage (message) {
    const userMsgBox = document.createElement('div');
          userMsgBox.classList.add('user-box');

          const userMsg = document.createElement('p');
                userMsg.classList.add('user-msg');
                userMsg.textContent = message;

          userMsgBox.appendChild(userMsg);
          chatContainer.appendChild(userMsgBox);

          chatContainer.scrollTop = chatContainer.scrollHeight;
    
    const rawBotReply = await getAIResponse(removeMarkdown(message));
    const cleanBotReply = removeMarkdown(rawBotReply);


    const botMsgBox = document.createElement('div');
          botMsgBox.classList.add('bot-box');

        const avatar = document.createElement('img');
              avatar.src = 'images/owl-face.png';
              avatar.alt = 'avatar';
              avatar.classList.add('avatar');
        const botMsg = document.createElement('p');
              botMsg.classList.add('bot-msg')
              botMsg.textContent = cleanBotReply;

        botMsgBox.appendChild(avatar);
        botMsgBox.appendChild(botMsg);
        chatContainer.appendChild(botMsgBox);
          
        chatContainer.scrollTop = chatContainer.scrollHeight;
}

// user interaction
async function chat() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;
         
     sendButton.disabled = true;    
     userInput.disabled = true; 
      
        try {
           await displayMessage(userMessage);
        } catch (error) {
            console.error("Error", error)
            botGreet("An unexpected error occurred. Please try again."); 
               
        } finally {
            sendButton.disabled = false;
            userInput.disabled = false;
            userInput.focus(); //  for user focus further interaction
            userInput.value = "";
        }  
}

sendButton.addEventListener('click', chat);

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        chat();       
    }
});

