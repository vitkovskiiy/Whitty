// src/server.js

const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const { createServer } = require("http");
const jwt = require("jsonwebtoken");
const cors = require('cors');

const prisma = require("./config/prisma.database");

// Імпорт роутів
const authRoutes = require("./routes/auth");
const avatarRouter = require("./routes/upload.router");
const { requireAuth } = require("./middleware/authMiddleware");
const postRouter = require("../src/routes/post.router");
const countryRouter = require("../src/routes/country.router");
const allUsersRouter = require("../src/routes/allUsers.router")
const conversationRouter = require("./routes/createConversation");
const chatMessagesRouter = require("../src/routes/chatMessage.router")

dotenv.config();
const port = process.env.PORT;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: true, 
    credentials: true, 
}));
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/avatars",express.static(path.join(__dirname, "../uploads/avatars")));


app.use("/api", postRouter,countryRouter,allUsersRouter,avatarRouter);
app.use("/auth", authRoutes);
app.use("/chat", conversationRouter,chatMessagesRouter)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/login.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/login.html"));
});

app.get("/feed", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/feed.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/register.html"));
});

app.get("/profile", requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/pages/profile.html"));
});

app.get("/chat", requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/pages/chat.html"));
});

app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

io.use(async (socket, next) => {
  const cookieHeader = socket.handshake.headers.cookie || "";

  const cookies = {};
  cookieHeader.split(";").forEach((cookie) => {
    const parts = cookie.split("=");
    if (parts.length === 2) cookies[parts[0].trim()] = parts[1].trim();
  });

  const token = cookies.jwt;
  if (!token) return next(new Error("No token provided"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { user_id: decoded.id },
    });

    if (user) {
      socket.data.avatar = user.avatar;
      socket.data.username = user.username;
    } else {
      socket.data.avatar = "/uploads/avatars/default.png";
      socket.data.username = "Anonymous";
    }
    next();
  } catch (err) {
    console.error("Socket Auth Error:", err);
    next(new Error("Authentication error"));
  }
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  const username = socket.data.username;
  if (username) {
    onlineUsers.set(username, socket.id);
    console.log(`✅ ${username} connected (${socket.id})`);
  }

  socket.emit("user_info", {
    username: socket.data.username,
    avatar: socket.data.avatar,
  });
  
  socket.on("sendMessage", (data) => {
    const username = socket.data.username;
    const isOnline = Array.from(onlineUsers.keys()).includes(username);
    socket.join(data.conversationId)
    io.to(data.conversationId).emit("new_message", {
      message: data.message,
    });
  });
  
  socket.on("join-room",(roomID) => {
      socket.join(roomID);  
      console.log("joined succesfully")
  })

  socket.on("send-message", (data) => {
    console.log(data);
    io.to(data.conversationId).emit("new-message", {
       message: data.message,
       partnerID: data.partnerId,
       username: data.partnerUsername,
       myID: data.myID,
    });
  })
  

  socket.on("disconnect", () => {
    if (socket.data.username) {
      console.log(`❌ ${socket.data.username} disconnected`);
      onlineUsers.delete(socket.data.username);
    }
  });
});

if (require.main === module) {
  server.listen(port, () => {
    console.log(` Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
