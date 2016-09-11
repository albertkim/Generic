import * as express from 'express'
import knex from '../config/knex'
import {User, CreateUser, UserSearch} from '../models/User'
import UserService from '../services/UserService'

const router = express.Router()

export default router

router.get('/users',
  async function(req, res, next) {
    try {
      const users: User[] = await UserService.findAll({}, null)
      res.send({
        users: users
      })
    } catch (error) {
      next(error)
    }
  }
)
