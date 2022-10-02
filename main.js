var request = require('request')
require('dotenv').config()
const fs = require('fs')
const path = require('path')

var username = process.env.USERNAME_VISA
var password = process.env.PASSWORD_VISA

var key = 'key_50ececf3-7c96-4009-a91a-e2169fb86abb.pem'
var cert = 'cert.pem'

const ssl_server = https.createServer(
  {
    key: fs.readFileSync(
      path.join(__dirname, 'key_50ececf3-7c96-4009-a91a-e2169fb86abb.pem')
    ),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
  },
  app
)

var options = {
  headers: {
    Authorization:
      'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
    'Content-Type': 'application/json'
  },
  uri: 'https://sandbox.api.visa.com/cofds-web/v1/datainfo',
  method: 'POST',
  json: {
    key: fs.readFileSync(
      path.join(__dirname, 'key_50ececf3-7c96-4009-a91a-e2169fb86abb.pem')
    ),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
    schema: {
      $ref: '#/components/schemas/COFDSServiceRequest'
    },
    value: {
      requestHeader: {
        requestMessageId: '6da6b8b024532a2e0eacb1af58581',
        messageDateTime: '2019-02-35 05:25:12.327'
      },
      requestData: {
        pANs: [4072208010000000],
        group: 'STANDARD'
      }
    }
  }
}

request(options, function (err, httpResponse, body) {
  if (err) {
    console.log('Hubo un error', JSON.stringify(err))
  }
  console.log('Correcto' + JSON.stringify(body))
})
// // const express = require('express')
// // const https = require('https')
// // const path = require('path')
// // const request = require('request')
// // const fs = require('fs')
// // const bodyParser = require('body-parser')

// // const app = express()
// // app.use(bodyParser.urlencoded({ extended: true })) // <==== parse request body as JSON
// // require('dotenv').config()

// var username = process.env.USERNAME_VISA
// var password = process.env.PASSWORD_VISA

// var options = {
//   Authorization:
//     'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
//   uri: 'https://sandbox.api.visa.com/cofds-web/v1/datainfo',
//   method: 'POST',
//   headers: { 'content-type': 'application/json' },
//   json: {
//     servers: [
//       {
//         url: 'https://sandbox.api.visa.com',
//         description: 'Sandbox server'
//       }
//     ],
//     paths: {
//       '/cofds-web/v1/datainfo': {
//         post: {
//           content: {
//             'application/json': {
//               Authorization:
//                 'Basic ' +
//                 Buffer.from(username + ':' + password).toString('base64'),
//               schema: {
//                 $ref: '#/components/schemas/COFDSServiceRequest'
//               },
//               value: {
//                 requestHeader: {
//                   requestMessageId: '6da6b8b024532a2e0eacb1af58581',
//                   messageDateTime: '2019-02-35 05:25:12.327'
//                 },
//                 requestData: {
//                   pANs: [4072208010000000],
//                   group: 'STANDARD'
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// request(options, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(response) // Print the shortened url.
//   } else {
//     console.log(body)
//   }
// })
// // app.post(options, (req, res, next) => {
// //   console.log('we got new connection')
// //   var data = req.body
// //   console.log(req, res, next)
// //   res.send(data)
// // })

// const ssl_server = https.createServer(
//   {
//     key: fs.readFileSync(
//       path.join(__dirname, 'key_50ececf3-7c96-4009-a91a-e2169fb86abb.pem')
//     ),
//     cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
//   },
//   app
// )

// ssl_server.listen(3443, console.log('SSl server is online!'))

// // var request = require('request')
// // require('dotenv').config()

// // const express = require('express')
// // const fs = require('fs')

// // const app = express()
// // const bodyParser = require('body-parser')
// // var path = require('path')

// // app.use(express.static(path.join(__dirname, 'public')))
// // app.use(bodyParser.json())
// // app.use(express.json())
// // app.use(bodyParser.urlencoded({ extended: true }))

// // var username = process.env.USERNAME_VISA
// // var password = process.env.PASSWORD_VISA
// // var key = 'key_50ececf3-7c96-4009-a91a-e2169fb86abb.pem'
// // var cert = 'cert.pem'
// // var cert_ca = 'DigiCertGlobalRootCA.pem'
// // var vdp = 'VDPCA-SBX.pem'

// // var options = {
// //   uri: 'https://sandbox.api.visa.com/cofds-web/v1/datainfo',
// //   method: 'POST',
// //   json: {
// //     servers: [
// //       {
// //         url: 'https://sandbox.api.visa.com',
// //         description: 'Sandbox server'
// //       }
// //     ],
// //     paths: {
// //       '/cofds-web/v1/datainfo': {
// //         post: {
// //           content: {
// //             'application/json': {
// //               Authorization:
// //                 'Basic ' +
// //                 Buffer.from(username + ':' + password).toString('base64'),
// //               schema: {
// //                 $ref: '#/components/schemas/COFDSServiceRequest'
// //               },
// //               key: fs.readFileSync(key),
// //               cert: fs.readFileSync(cert),
// //               cert_ca: fs.readFileSync(cert_ca),
// //               vdp: fs.readFileSync(vdp),
// //               value: {
// //                 requestHeader: {
// //                   requestMessageId: '6da6b8b024532a2e0eacb1af58581',
// //                   messageDateTime: '2019-02-35 05:25:12.327'
// //                 },
// //                 requestData: {
// //                   pANs: [4072208010000000],
// //                   group: 'STANDARD'
// //                 }
// //               }
// //             }
// //           }
// //         }
// //       }
// //     }
// //   }
// // }

// // request(options, function (error, response, body) {
// //   if (!error && response.statusCode == 200) {
// //     console.log(response) // Print the shortened url.
// //   } else {
// //     console.log(body)
// //   }
// // })
