import {Router} from 'express'
import knex from '../../config/knex'
import {User, CreateUser, UserSearch} from '../models/User'
import {FindUserService} from '../services/user/FindUserService'

const router = Router()

export default router

router.get('/users',
  async function(req, res, next) {
    try {
      const users: User[] = await FindUserService.findAll({})
      res.send({
        users: users
      })
    } catch (error) {
      next(error)
    }
  }
)
