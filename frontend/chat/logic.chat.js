const socket = io("http://localhost:8080", {
  transports: ["websocket"],
  withCredentials: true,
});
//chat from

const formChat = document.getElementById("formChat");
const input = document.getElementById("inputMessage");
const messages = document.getElementById("messages");
const headerChat = document.getElementById("chat-header");
//load users
const userListContainer = document.getElementById("usersList");
const allUsersListContainter = document.getElementById("allUsersDiv");
const loadingPlaceholder = document.getElementById("loadingPlaceholder");
const startChatBtn = document.getElementById("user-item");
const headerChatTitle = document.getElementById("chatWithTitle");

//create an object that we send in socket
let data = {
  conversationId: null,
};

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
  avatarImg.classList.add("msg-out");
  const usernameSpan = document.createElement("span");
  usernameSpan.textContent = data.username + ": ";
  usernameSpan.style.fontWeight = "common";
  
  const time = new Date().toLocaleTimeString();
  console.log(time);

  const textSpan = document.createElement("li");
  textSpan.textContent = data.message;
  messageElement.classList.add("msg-out")
 
  messageElement.innerHTML = `
                <span class="msg-out">${textSpan.textContent}</span>
                <img src="${avatarImg.src|| "/uploads/imgSite/default.png"}" alt="Avatar" class="avatar-right" width="30" height="30" style="border-radius: 50%; margin-left: 8px;">
              `;
  

  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
});

const fetchMyId = async function () {
  const me = await fetch("/auth/me");
  const response = await me.json();
  data.myID = response.user_id;
  console.log(data);
};

async function allUsers() {
  try {
    const response = await fetch("/api/allusers");
    if (!response.ok) throw new Error(`Response error : ${response.status}`);

    const users = await response.json();
    if (loadingPlaceholder) loadingPlaceholder.style.display = "none";
    allUsersListContainter.innerHTML = "";

    users.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.classList.add("user-item");
      userDiv.innerHTML = `
          <img src="${user.avatar || "/uploads/imgSite/default.png"}" alt="Avatar" class="avatar" width="40" height="40" style="border-radius: 50%; margin-right: 8px;">
          <span class="username">${user.username}</span>
      `;

      userDiv.addEventListener("click", async () => {
        try {
          const response = await fetch("create-conversation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ partner_id: user.user_id }),
          });
          const responseData = await response.json();
          const conversationId = responseData.conversation.id;
          const chatMessages = responseData.conversation.messages;

          data.conversationId = conversationId;
          messages.innerHTML = "";

          chatMessages.forEach((m) => {
            const newMesssage = document.createElement("li");

            if (parseInt(data.myID) === parseInt(m.senderId)) {
              newMesssage.classList.add("msg-out");
            } else {
              newMesssage.classList.add("msg-in");
            }

            newMesssage.innerHTML = `<span>${m.text}</span>`;
            messages.appendChild(newMesssage);
          });
          messages.scrollTop = messages.scrollHeight;
        } catch (e) {
          console.error("Ошибка при открытии чата:", e);
        }
      });

      allUsersListContainter.appendChild(userDiv);
    });
  } catch (e) {
    console.error("Ошибка загрузки юзеров:", e);
  }
}

formChat.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (input.value) {
    data.message = input.value;
    socket.emit("sendMessage", data);
    
    if (data.conversationId !== null) {
      const response = await fetch(`/chat/messages/${data.conversationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
       alert("Please select a chat");
    }

    input.value = "";
  }
});

allUsers();
fetchMyId();
