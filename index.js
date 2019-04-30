require('dotenv').config()
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const newMonitor = require("./handlers/newMonitor");
const searchMonitor = require("./handlers/searchMonitor");
const updateMonitorStatus = require("./handlers/updateMonitorStatus");

const PORT = process.env.PORT || 5000

express()
  .use(bodyParser.json())
  .post('/newMonitor', (req, res) => {
    return newMonitor(req, res)
  })
  .post('/searchMonitor', (req, res) => {
    return searchMonitor(req, res)
  })
  .post('/updateMonitorStatus', (req, res) => {
    return updateMonitorStatus(req, res)
  })
  .listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
