///<reference path="../typings/index.d.ts"/>

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

app.get('/ping', function(req, res) {
  res.send({
    version: 1.0
  })
})

app.use('/admin', AdminController)
app.use('/user', UserController)

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})
