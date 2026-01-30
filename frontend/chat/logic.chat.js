const socket = io("http://localhost:8080", {
  transports: ["websocket"],
  withCredentials: true,
});

const formChat = document.getElementById("formChat");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const userListContainer = document.getElementById("usersList");

socket.on("connect", () => {
  console.log("Connected to chat server");
});
socket.on("user_info", (data) => {
  document.getElementById("username").textContent = data.username;
  document.getElementById("avatar").src = data.avatar || "/avatars/default.jpg";
});
socket.on("new_message", (data) => {
  const messageElement = document.createElement("li");
  const avatarImg = document.createElement("img");
  avatarImg.src = data.avatar || "/avatars/default.jpg";
  avatarImg.alt = "User Avatar";
  avatarImg.classList.add("avatar");
  avatarImg.width = 30;
  avatarImg.height = 30;
  avatarImg.style.borderRadius = "50%";
  avatarImg.style.marginRight = "8px";
  const usernameSpan = document.createElement("span");
  usernameSpan.textContent = data.username + ": ";
  usernameSpan.style.fontWeight = "common";

  const textSpan = document.createElement("span");
  textSpan.textContent = data.message;

  messageElement.appendChild(avatarImg);
  messageElement.appendChild(statusOnline);
  messageElement.appendChild(usernameSpan);
  messageElement.appendChild(textSpan);

  document.getElementById("messages").appendChild(messageElement);
});
async function allUsers() {
  try {
    const response = await fetch("/api/allusers");
    if(!response.ok){ 
      throw new Error (`Response error : ${response.status}`)
    }
    const users = await response.json();
    users.forEach((user) => {
      const userElement = document.createElement("div");
      userElement.classList.add("user-item");
      userElement.innerHTML = `
        <img src="${user.avatar || "/avatars/default.jpg"}" alt="Avatar" class="avatar" width="40" height="40" style="border-radius: 50%; margin-right: 10px;">
        <span class="username">${user.username}</span>
      `;
      userListContainer.appendChild(userElement);
    });
  } catch (e) {
    console.log(e + "error on handle all users");
  }
}

formChat.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("sendMessage", input.value);
    console.log("Message sent :", input.value);
    const messageElement = document.createElement("div");
    input.value = "";
  }
});

allUsers();
