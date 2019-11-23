// Dependencies
import * as http from 'http'
import * as url from 'url'

// Configure the server to response to all request with a string
const server = http.createServer((request, response) => {
  // Parse the url
  const parsedUrl = url.parse(request.url, true)

  // Get the path
  const path = parsedUrl.pathname
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')

  // Send the response
  response.end('Hello World!\n')

  // Log the reqeust / response
  console.log(`Request received on path: ${trimmedPath}`)
})

// Start the server
server.listen(3000, () => {
  console.log('The server is up and running now')
})
