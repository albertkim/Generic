import * as express from 'express'
import * as bodyParser from 'body-parser'
import knex from './config/knex'

import AdminController from './api/controllers/AdminController'
import UserController from './api/controllers/UserController'
import LoginRegisterController from './api/controllers/LoginRegisterController'

interface ServerOptions {
  port: number
}

export class Server {

  private port: number
  private app: express.Application

  constructor(options: ServerOptions) {

    this.port = options.port
    this.app = express()

    this.app.use((req, res, next) => {
      if (req.method !== 'OPTIONS') {
        console.log(`${req.method} ${req.url}`)
      }
      next()
    })
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({extended: true}))
    this.app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, access_token, Authorization, Authentication')
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
      next()
    })

    this.app.get('/ping', function(req: express.Request, res: express.Response) {
      res.send({
        version: 1.0
      })
    })

    this.app.use('/api/:version', LoginRegisterController)
    this.app.use('/api/:version/admin', AdminController)
    this.app.use('/api/:version/user', UserController)

    this.app.use(function(error: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      console.log(error)
      const statusCode = error.statusCode != undefined ? error.statusCode : 500
      const message = error.message
      res.status(statusCode).send({message: message})
    })
  }

  run() {
    this.app.listen(this.port)
  }

}
