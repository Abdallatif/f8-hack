require('dotenv').config()
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const newMonitor = require("./handlers/newMonitor");

const PORT = process.env.PORT || 5000

express()
  .use(bodyParser.json())
  .post('/newMonitor', (req, res) => {
    return newMonitor(req, res)
  })
  .listen(PORT, () => console.log(`Listening on http://localhost:${ PORT }`))
