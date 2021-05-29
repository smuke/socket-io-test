const socket = io();

const messages = document.getElementById("messages");
const welcomeMessage = document.getElementById("welcomeMessage");
const form = document.getElementById("form");
const input = document.getElementById("input");

console.log("Connecting to socket...")
socket.on("connect", () => {
    console.log("-----------------------------------\nSuccessfully connected to socket!\n-----------------------------------");
    
    welcomeMessage.textContent = "Welcome to the chat room!"
    welcomeMessage.style.color = "rgb(168, 89, 204)";
});

let messageID = 0;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value) {
        messageID++;
        socket.emit("chat message", input.value);
        input.value = "";
    }
});

socket.on("chat message", (message) => {
    const item = document.createElement("li");

    item.textContent = message;
    messages.appendChild(item);
    
    window.scrollTo(0, document.body.scrollHeight);

    console.log(`[${messageID}] ` + message);
});