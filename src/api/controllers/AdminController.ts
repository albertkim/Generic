import * as express from 'express'
import knex from '../config/knex'
import {User, CreateUser, UserSearch} from '../models/User'
import {FindUserService} from '../services/UserService'

const router = express.Router()

export default router

router.get('/users',
  async function(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const users: User[] = await FindUserService.findAll({}, null)
      res.send({
        users: users
      })
    } catch (error) {
      next(error)
    }
  }
)
