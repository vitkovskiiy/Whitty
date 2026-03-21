const socket = io({
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
const headerAvatar = document.getElementById("chatAvatar");

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

socket.on("new-message", (incomingData) => {
  console.log(incomingData);
  const messageElement = document.createElement("li");
  const time = new Date().toLocaleTimeString();

  if (parseInt(data.myID) === parseInt(incomingData.myID)) {
    messageElement.classList.add("msg-out");
  } else {
    messageElement.classList.add("msg-in");
  }

  messageElement.textContent = incomingData.message;

  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
});

const fetchMyId = async function () {
  const me = await fetch("/auth/me");
  const response = await me.json();
  data.myID = response.user_id;
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

          data.conversationId = responseData.conversation.id;
          const chatMessages = responseData.conversation.messages;
          const partner = responseData.conversation.participants.find((user) => user.user_id !== parseInt(data.myID));
          socket.emit("join-room", data.conversationId);
          headerAvatar.src = partner.avatar;
          headerAvatar.style = "display: inline-block";

          data.partnerUsername = partner.username;
          data.partnerId = partner.user_id;

          headerChatTitle.textContent = partner.username;
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
    console.log(data);
    socket.emit("send-message", data);
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
