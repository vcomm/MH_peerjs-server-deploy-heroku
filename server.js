/*
// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");

const { ExpressPeerServer } = require("peer");

const app = express();

const PORT = process.env.PORT || 5000;

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("dist"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  console.log(`Product load:`,__dirname + "/index.html");
  response.sendFile(__dirname + "/index.html");
});

// listen for requests :)
const listener = app.listen(PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

// peerjs server
const peerServer = ExpressPeerServer(listener, {
  port: 9000,
  debug: true,
  path: '/myapp'
});

app.use('/peerjs', peerServer);
*/

const express = require('express');
const { ExpressPeerServer } = require('peer');
const app = express();

app.enable('trust proxy');

const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

const peerServer = ExpressPeerServer(server, {
  path: '/myapp',
  allow_discovery: true
});

app.use('/', peerServer);

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("dist"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  console.log(`Product load:`,__dirname + "/index.html");
  response.sendFile(__dirname + "/index.html");
});