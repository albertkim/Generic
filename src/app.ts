/// <reference path="../typings/index.d.ts"/>

import * as express from 'express'
import * as bodyParser from 'body-parser'
import environment from './api/config/environment'
import knex from './api/config/knex'

import AdminController from './api/controllers/AdminController'
import UserController from './api/controllers/UserController'

console.log(`Current environment: ${environment.environment}`)

const app = express()
const port = 80

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, access_token, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  next()
})

app.get('/ping', function(req: express.Request, res: express.Response) {
  res.send({
    version: 1.0
  })
})

app.use('/admin', AdminController)
app.use('/user', UserController)

app.use(function(error: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  console.log(error)
  const statusCode = error.statusCode != undefined ? error.statusCode : 500
  const message = error.message
  res.status(statusCode).send({message: message})
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})
