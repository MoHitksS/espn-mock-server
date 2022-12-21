const jsonServer = require('json-server')
const cors = require('cors')
const path = require('path')
const Monitor = require('ping-monitor');

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

const myApi = new Monitor({
    website: 'https://espncrickinfoin.netlify.app/',
    title: 'ESPN CRICKINFO',
    interval: 3,

    config: {
      intervalUnits: 'minutes' // seconds, milliseconds, minutes {default}, hours
    },

    expect: {
      statusCode: 200
    }
});
server.use(cors())
server.use(jsonServer.bodyParser)
server.use(middlewares)
server.use(router)

const PORT = 8000

server.listen(PORT, () => {
  console.log(`JSON Server is running`)
})