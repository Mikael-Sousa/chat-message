require("dotenv").config();
const http = require('http')
const app = require("./app");
const { WebSocketServer } = require('ws')
const setupWS = require("./ws/index");

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

setupWS(wss);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
