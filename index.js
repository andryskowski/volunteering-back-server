const express = require('express');
// const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import Routes
const authRoute = require('./routes/auth');
const placesRoute = require('./routes/places');
const usersRoute = require('./routes/users');
const commentsRoute = require('./routes/comments');
const messagesRoute = require('./routes/messages');
const conversationsRoute = require('./routes/conversations');
const bodyParser = require('body-parser');
// const http = require('http');
const app = express();
// const server = http.createServer(app);
var http = require( "http" ).createServer( app );

const port = process.env.PORT;


/////////

var cors = require('cors');
app.use(bodyParser.json());

dotenv.config();
app.use(cors({
    origin: '*'
}));
app.use('/places', placesRoute);
app.use('/users', usersRoute);
app.use('/comments', commentsRoute);
app.use('/messages', messagesRoute);
app.use('/conversations', conversationsRoute);

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
{ useNewUrlParser: true },
() => console.log('connected to db')
);

//Middleware
app.use(express.json());
//Route Middlewares

app.use('/api/user', authRoute);

http.listen(port, () => console.log('Server Up and running'));

//////

/* socket.io */

const io = require('socket.io')(http, {
  cors: {
    origin: "https://volunteering-map.herokuapp.com",
  },
});

const httpServer = require("http").createServer();
// const io = require("socket.io")(port, {
    // cors: {
    //   origin: "http://localhost:3000",
    // },
//   });


  
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
  
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text, date }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
            date,
      });
      console.log(senderId, text, user.socketId, user);
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
