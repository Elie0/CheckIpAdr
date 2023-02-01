const {checkIpAdress,getClass,getBinary}= require('./functions')         // These are all the functions used to provide the backend of the app
const http = require('http')
const express = require('express')     // all of these are used to provide a front end interface, 
const socketio = require('socket.io')
const app = express()
app.use(express.static('public'))
const server = http.createServer(app)   
const io = socketio(server)

const port = process.env.PORT || 3000


io.on('connection',(socket)=>{    // you dont need to read all of this, just go to function.js where the logic of ip checker resides
    console.log('New Websocket connection')
socket.on('checkip',(ip)=>{        // by socket.on I read the user input from the form. You can if you want check how the communication was done in the main.js file
    if(checkIpAdress(ip)===true){           // here I call checkIpadress, if it is true, I emit to the frontend the data calculation below
        socket.emit('result','Valid ip')
        socket.emit('toBinary',getBinary(ip))
        socket.emit('classInfo',getClass(ip))
    }
    else{
        socket.emit('result',checkIpAdress(ip))  // else I only return the result, which will eventally be describing why ip adress i not valid
    }
    
})


})


server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})





