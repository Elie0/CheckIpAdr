const {checkIpAdress,getClass,getBinary,getMask}= require('./functions')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const app = express()
app.use(express.static('public'))
const server = http.createServer(app)   // to use socket.io
const io = socketio(server)

const port = process.env.PORT || 3000

const ip =process.argv[2]

io.on('connection',(socket)=>{       // we can use io to communicate with a specific client if i have diff clients it will run many times
    console.log('New Websocket connection')
socket.on('checkip',(ip)=>{
    if(checkIpAdress(ip)===true){
        socket.emit('result','Valid ip')
        socket.emit('toBinary',getBinary(ip))
        socket.emit('classInfo',getClass(ip))
    }
    else{
        socket.emit('result',checkIpAdress(ip))
    }
    
})


})


server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})





