import {Router} from 'express'
import knex from '../../../config/knex'
import {EmailVerificationService} from '../../services/user/EmailVerificationService'
import {AuthMiddleware} from '../AuthMiddleware'
import MeController from './MeController'
import * as createError from 'http-errors'

const router = Router()

router.use('/me', MeController)

export default router

router.post('/verifyEmail',
  function(req, res, next) {
    const token = req.query.token as string
    if (!token) {
      next(createError(400, 'Token is required in the query parameter'))
    }
    knex.transaction(transaction => {
      return EmailVerificationService.validateToken(token, transaction)
    }).then(() => {
      res.send()
    }).catch(next)
  }
)
