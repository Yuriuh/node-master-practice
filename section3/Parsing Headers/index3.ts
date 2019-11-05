import * as http from 'http'
import * as url from 'url'

const server = http.createServer((request, response) => {
  const parseUrl = url.parse(request.url, true)

  const path = parseUrl.pathname
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')

  const queryStringObject = parseUrl.query

  const method = request.method.toLowerCase()

  const headers = request.headers
})
