const express = require('express')
const router = require('./routes/index');
const cors = require('cors')

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.json());

app.use(router);

module.exports = app
