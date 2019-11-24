// Dependencies
import * as http from 'http'
import * as https from 'https'
import * as url from 'url'
import * as fs from 'fs'
import { StringDecoder } from 'string_decoder'
import { config } from './config'

// Instantiate the HTTP server
const httpServer = http.createServer((request, response) => {
  unifiedServer(request, response)
})

// Start the HTTP server
httpServer.listen(config.httpPort, () => {
  console.log('The server is up and running now')
  console.log('port', config.httpPort)
})

// Instantiate the HTTPS server
const httpsServerOptions = {
  'key': fs.readFileSync(__dirname + '/https/key.pem'),
  'cert': fs.readFileSync(__dirname + '/https/cert.pem')
}
const httpsServer = https.createServer(httpsServerOptions, (request, response) => {
  unifiedServer(request, response)
})

// Start the HTTPS server
httpsServer.listen(config.httpsPort, () => {
  console.log('The server is up and running now')
  console.log('port', config.httpsPort)
})

// All the server logic for both the http and https server
const unifiedServer = (request, response) => {
  // Parse the url
  const parsedUrl = url.parse(request.url, true)

  // Get the path
  const path = parsedUrl.pathname
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')

  // Get the query string as an object
  const queryStringObject = parsedUrl.query

  // Get the HTTP method
  const method = request.method.toLowerCase()

  // Get the headers as an object
  const headers = request.headers

  // Get the payload, if any
  const decoder = new StringDecoder('utf-8')
  let buffer = ''
  request.on('data', data => {
    buffer += decoder.write(data)
  })
  request.on('end', () => {
    buffer += decoder.end()

    // Check the router for a matching path for a handler. If one is not found,
    // use the notFound handler instead.
    const chosenHandler = typeof (router[trimmedPath]) !== 'undefined'
      ? router[trimmedPath]
      : handlers.notFound

    // Construct the data object to send to the handler
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer
    }

    // Route the request to the handler specified in the router
    chosenHandler(data, (statusCode, payload) => {
      // Use the status code returned form the handler, or set the default status code to 200
      statusCode = typeof (statusCode) === 'number' ? statusCode : 200

      // Use the payload returned from the handler, or set the default payload to an empty object
      payload = typeof (payload) === 'object' ? payload : {}

      // Convert the payload to a string
      const payloadString = JSON.stringify(payload)

      // Return the response
      response.setHeader('Content-Type', 'application/json')
      response.writeHead(statusCode)
      response.end(payloadString)
      console.log('Returning this response: ', statusCode, payloadString)
    })
  })
}

interface Handlers {
  sample: any,
  notFound: any
}
// Define all the handlers
const handlers = {} as Handlers

// Sample handler
handlers.sample = function (data, callback) {
  callback(406, { 'name': 'sample handler' })
}

// Not found handler
handlers.notFound = function (data, callback) {
  callback(404)
}

// Define the request router
const router = {
  'sample': handlers.sample
}
