const http = require('http');
const express = require('express'); 

const port = 12345;

const server = express()

server.use(express.static('content'))

server.listen(port, () => console.log("Helo"))

server.use('/views', express.static('views'))
