const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/status', (req, res) => {
  res.send({
    message: `Hello response`
  })
})

require('./routes')(app)

sequelize.sync()
  .then(() => {
    app.listen(config.port)
    console.log(`Server started in port ${config.port}`)
  })
