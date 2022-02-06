const socket = io();
let name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");

// name prompt
do {
  name = prompt("please enter your name: ");
} while (!name);

// message from textarea
textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

// Message with user name
function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };
  // display's message
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  // event to send message on server
  socket.emit("message", msg);
}

// creating message format
function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");
  // template
  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// server message
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

// auto scroll new message
function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
