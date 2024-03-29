// Dependencies
import * as http from 'http'
import * as url from 'url'

// Configure the server to respond to all requests with a string
const server = http.createServer((request, response) => {
  // 1. Parse the url
  const parsedUrl = url.parse(request.url, true)
  
  // 2. Get the path
  const path = parsedUrl.pathname
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')

  // 3. Get the query string as an object
  const queryStringObject = parsedUrl.query

  // 4. Get the HTTP method
  const method = request.method.toLowerCase()

  // 5. Get the headers as an object
  const headers = request.headers

  // 6. Send the response
  response.end('Hello World!\n')

  // Log the request / response
  console.log('Request received with these headers ', headers)
})

// Start the server
server.listen(3000, () => {
  console.log('The server is up and running now')
})
