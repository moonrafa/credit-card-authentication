require('dotenv').config()
const express = require('express')
const fs = require('fs')
var https = require('https')
const request = require('request')
const app = express()
const bodyParser = require('body-parser')
var path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
var username = process.env.USERNAME_VISA
var password = process.env.PASSWORD_VISA
var key = 'key_50ececf3-7c96-4009-a91a-e2169fb86abb.pem'
var cert = 'cert.pem'

app.get('/', (req, res) => {
  var options = {
    hostname: 'sandbox.api.visa.com',
    port: 443,
    uri: 'https://sandbox.api.visa.com/vdp/helloworld',
    method: 'GET',
    key: fs.readFileSync(key),
    cert: fs.readFileSync(cert),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization:
        'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    },
    json: true
  }

  options.agent = new https.Agent(options)

  request.get(options, (err, res, body) => {
    if (err) {
      return console.log(err)
    }
    console.log(`Status: ${res.statusCode}`)
    console.log(body)
  })
  res.send('Hello World')
})

app.listen(3050, function () {
  console.log('Example app listening on port 3050.')
})
