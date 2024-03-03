const express=require('express')
const app=new express()
const http = require('http');
const server = http.createServer(app);
const {Server}=require("socket.io");
const io=new Server(server);

app.use(express.static('./public'))

const port=process.env.PORT || 5000
const ip = "192.168.1.4";
app.get('/', (req, res) => {

    res.sendFile(__dirname + '/public/index.html');
  });

io.on('connection',(socket)=>{
    console.log('User connected');
    io.sockets.emit('connected','Welcome, New user just joined the chat');
    
    
    socket.on('chat message', (msg) => {
        io.emit('chat message',msg);
        console.log('message: ' ,msg);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
        io.sockets.emit('disconnected','Goodbye, hope to see you soon');
      });
    
})

server.listen(port,ip,()=>{
    console.log(`App is listening on http://${ip}:${port}`);
})


