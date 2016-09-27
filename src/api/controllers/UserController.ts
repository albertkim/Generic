import {Response, NextFunction, Router} from 'express'
import knex from '../../config/knex'
import {User, UpdateUser, UserWithToken} from '../models/User'
import {LoginUserService, RegisterUserService} from '../services/UserService'
import {AuthMiddleware} from './AuthMiddleware'
import {CustomRequest} from '../models/CustomRequest'

const router = Router()

export default router

router.get('/me',
  AuthMiddleware.isLoggedIn,
  async function(req: CustomRequest, res: Response, next: NextFunction) {
    res.send(req.user)
  }
)

router.patch('/me',
  AuthMiddleware.isLoggedIn,
  async function(req: CustomRequest, res: Response, next: NextFunction) {
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
