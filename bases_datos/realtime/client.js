const io = require('socket.io-client');

let socket = io.connect('http://localhost:3000',{reconnect:true});

socket.on('connect',function(){
    console.log("Socket Conected")
})

module.exports(socket);