var request = require('request')
const fs = require('fs')
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

const username = process.env.USERNAME_VISA
const password = process.env.PASSWORD_VISA
const key = 'key_50ececf3-7c96-4009-a91a-e2169fb86abb.pem'
const cert = 'cert.pem'

var postData = {
  requestHeader: {
    requestMessageId: '6da6b8b024532a2e0eacb1af58581',
    messageDateTime: '2019-02-35 05:25:12.327'
  },
  requestData: {
    pANs: [4072208010000000],
    group: 'STANDARD'
  }
}

var uri = 'https://sandbox.api.visa.com/cofds-web/v1/datainfo'
var options = {
  method: 'post',
  payload: postData,
  json: true,
  uri: uri,
  key: fs.readFileSync(key),
  cert: fs.readFileSync(cert),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization:
      'Basic ' + Buffer.from(username + ':' + password).toString('base64')
  }
}
request(options, function (err, res, body) {
  if (err) {
    console.error('error posting json: ', err)
    throw err
  }
  var headers = res.headers
  var statusCode = res.statusCode
  console.log('headers: ', headers)
  console.log('statusCode: ', statusCode)
  console.log('body: ', body)
})
