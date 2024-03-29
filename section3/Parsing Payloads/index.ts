// Dependencies
import * as http from 'http'
import * as url from 'url'
import { StringDecoder } from 'string_decoder'

// Configure the server to respond to all requests with a string
const server = http.createServer((request, response) => {
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
    
    // Send the response
    response.end('Hello World!\n')

    // Log the request / response
    console.log('Request received with this payload ', buffer)
  })
})

// Start the server
server.listen(3000, () => {
  console.log('The server is up and running now')
})
