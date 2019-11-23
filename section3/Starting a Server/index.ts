import * as http from 'http'

const server = http.createServer((request, response) => {
  response.end('Hello World!\n')
})

server.listen(3000, () => {
  console.log('The Server is up and running now')
})
