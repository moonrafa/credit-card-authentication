const express = require('express')
const fs = require('fs')
var https = require('https')
const request = require('request')
const app = express()
const bodyParser = require('body-parser')
var path = require('path')
var crypto = require('crypto')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('dotenv').config()

var apiKey = process.env.XPAY_API_KEY
var sharedSecret = process.env.XPAY_SHARED_SECRET

var resourcePath = 'helloworld'
var queryParams = 'apiKey=' + apiKey
var postBody = ''

app.get('/', (req, res) => {
  var timestamp = Math.floor(Date.now() / 1000)
  var preHashString = timestamp + resourcePath + queryParams + postBody
  var hashString = crypto
    .createHmac('sha256', sharedSecret)
    .update(preHashString)
    .digest('Hex')
  var xPayToken = 'xv2:' + timestamp + ':' + hashString

  console.log(preHashString)
  console.log(xPayToken)

  var options = {
    hostname: 'sandbox.api.visa.com',
    port: 443,
    uri: 'https://sandbox.api.visa.com/vdp/helloworld?' + queryParams,
    method: 'GET',

    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-pay-token': xPayToken
    },
    json: true
  }

  console.log(options)

  options.agent = new https.Agent(options)

  request.get(options, (err, res, body) => {
    if (err) {
      return console.log(err)
    }
    console.log(`Status: ${res.statusCode}`)
    console.log(body)
  })
  res.send('Hello World ')
})

app.listen(3050, function () {
  console.log('Example app listening on port 3050.')
})
