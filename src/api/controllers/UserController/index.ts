import {Response, NextFunction, Router} from 'express'
import knex from '../../../config/knex'
import {User, UpdateUser, UserWithToken} from '../../models/User'
import {LoginUserService} from '../../services/user/LoginUserService'
import {RegisterUserService} from '../../services/user/RegisterUserService'
import {UserNotificationPreferenceService} from '../../services/NotificationPreferenceService'
import {AuthMiddleware} from '../AuthMiddleware'
import {CustomRequest} from '../../models/CustomRequest'
import MeController from './MeController'
import * as createError from 'http-errors'

const router = Router()

router.use('/me', MeController)

export default router

router.post('/verifyEmail',
  function(req, res, next) {
    const token = req.query.token
    if (!token || token == null) {
      return next(createError(400, 'You must provide a token as a query parameter'))
    }
  }
)
