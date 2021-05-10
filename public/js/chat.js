const socket = io();

document.getElementById("form").addEventListener("submit", handleSubmit);
document.getElementById("one").addEventListener("submit", handleOne);
message = document.getElementById("message");
message = document.getElementById("message2");

function handleSubmit(e) {
  e.preventDefault();
  socket.emit("message", message.value);
}

socket.on("message", (message) => {
  console.log(message);
});

function handleOne(e) {
  e.preventDefault();
  socket.emit("one", message.value);//send to one|specific user 
}

socket.on("one", (message) => {
  console.log(message);
});