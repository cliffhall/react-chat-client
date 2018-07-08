// client-server.js

// Serve the client
const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

console.log(`Server for React instant message client started. http://localhost:${port}/`);
app.use(express.static('app'));

app.get('/', function(req, res) {
    console.log('New client request');
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port);