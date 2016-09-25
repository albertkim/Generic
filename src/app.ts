import * as cluster from 'cluster'
import * as os from 'os'
import * as dotenv from 'dotenv'
import * as knex from 'knex'
import {Server} from './Server'
import environment from './api/config/environment'

dotenv.config()

const numberOfCPUs = os.cpus().length
const port = 81

if (cluster.isMaster) {

  console.log(`Current environment: ${environment.environment}`)
  console.log(`Number of cpus: ${numberOfCPUs}`)

  for (let i = 0; i < numberOfCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`)
    console.log(`Restarting worker process...`)
    cluster.fork()
  })

  console.log(`Master process running`)

} else {

  new Server({
    port: port
  }).run()

  console.log(`Worker process ${cluster.worker.id} running on port ${port}`)

}
