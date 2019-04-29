const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on http://localhost:${ PORT }`))
