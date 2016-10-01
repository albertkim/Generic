import * as cluster from 'cluster'
import * as os from 'os'
import {Server} from './Server'

// Environment variable validation
if (!process.env.WEB_URL) { throw new Error('WEB_URL required') }
if (!process.env.DATABASE_HOST) { throw new Error('DATABASE_HOST required') }
if (!process.env.DATABASE_USER) { throw new Error('DATABASE_USER required') }
if (!process.env.DATABASE_PASSWORD) { throw new Error('DATABASE_PASSWORD required') }
if (!process.env.DATABASE_DATABASE) { throw new Error('DATABASE_DATABASE required') }
if (!process.env.DATABASE_CLIENT) { throw new Error('DATABASE_CLIENT required') }

console.log('All required environment variables checked.')

const numberOfCPUs = os.cpus().length
const port = 80

// if (cluster.isMaster) {

//   console.log(`Current environment: ${environment.environment}`)
//   console.log(`Number of cpus: ${numberOfCPUs}`)

//   for (let i = 0; i < numberOfCPUs; i++) {
//     cluster.fork()
//   }
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`)
//     console.log(`Restarting worker process...`)
//     cluster.fork()
//   })

//   console.log(`Master process running`)

// } else {

//   new Server({
//     port: port
//   }).run()

//   console.log(`Worker process ${cluster.worker.id} running on port ${port}`)

// }

new Server({
  port: port
}).run()

console.log(`Running on port ${port}`)
