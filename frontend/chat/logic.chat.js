const socket = io("http://localhost:8080", {
  transports: ["websocket"],
  withCredentials: true,
});

const formChat = document.getElementById("formChat");
const messages = document.getElementById("messages");
const userListContainer = document.getElementById("usersList");
const allUsersListContainter = document.getElementById("allUsersDiv");
const loadingPlaceholder = document.getElementById("loadingPlaceholder");
const startChatBtn = document.getElementById("user-item");
const input = document.getElementById("inputMessage")
const messageContainer = document.getElementById("messages-container")

const content = input.value;
console.log(content);
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
  messageElement.appendChild(avatarImg);
  messageElement.appendChild(usernameSpan);
  messageElement.appendChild(textSpan);

  document.getElementById("messages").appendChild(messageElement);
});

async function allUsers() {
  try {
    const response = await fetch("/api/allusers");
    if (!response.ok) {
      throw new Error(`Response error : ${response.status}`);
    }
    const users = await response.json();
    if (loadingPlaceholder) {
      loadingPlaceholder.style.display = "none";
    }
    allUsersListContainter.innerHTML = "";

    users.forEach((user) => {
      const userDiv = document.createElement("div");
      console.log("ДАННЫЕ ЮЗЕРА:", user);
      userDiv.classList.add("user-item");
      userDiv.innerHTML = `
          <img src="${user.avatar || "/uploads/imgSite/default.png"}" alt="Avatar" class="avatar" width="40" height="40" style="border-radius: 50%; margin-right: 8px;">
          <span class="username">${user.username}</span>
        `;
        userDiv.addEventListener("click",async ()=> {
             try {
              const response = await fetch("create-conversation", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                  partner_id: user.user_id
                })
              })
              const responseData = await response.json();
              const conversationId = responseData.conversationId
              const fetchMessages = await fetch(`/chat/messages/${conversationId}`)
              console.log(fetchMessages)
              const responseFetch = await fetchMessages.json(); 
              console.log(responseFetch);
              const respins = responseFetch.forEach((m) => {
                 console.log(m.text);
              });
             
              const newMesssage = document.createElement("li");
             } catch (e) { 
              throw new Error ("Failed when created a chat")
            }
        })
      allUsersListContainter.appendChild(userDiv);
    });
  } catch (e) {
    console.log(e + "error on handle all users");
  }
}

document.getElementById('formChat').addEventListener('submit', async function (event){
    event.preventDefault();

})

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
