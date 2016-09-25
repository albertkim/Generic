import * as express from 'express'
import knex from '../config/knex'
import {User, UpdateUser, UserWithToken} from '../models/User'
import {LoginUserService, RegisterUserService} from '../services/UserService'
import {AuthMiddleware} from './AuthMiddleware'
import {CustomRequest} from '../models/CustomRequest'

const router = express.Router()

export default router

router.patch('/me',
  AuthMiddleware.isLoggedIn,
  async function(req: CustomRequest, res: express.Response, next: express.NextFunction) {
    try {
      const updateUser: UpdateUser = {
        id: req.user.id
      }
      if ('phone' in req.body) { updateUser.phone = req.body.phone }
      if ('name' in req.body) { updateUser.name = req.body.name }
      
    } catch (error) {
      next(error)
    }
  }
)
