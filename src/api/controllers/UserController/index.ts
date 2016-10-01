import {Response, NextFunction, Router} from 'express'
import knex from '../../../config/knex'
import {EmailVerificationService} from '../../services/user/EmailVerificationService'
import {AuthMiddleware} from '../AuthMiddleware'
import {CustomRequest} from '../../models/CustomRequest'
import MeController from './MeController'
import * as createError from 'http-errors'

const router = Router()

router.use('/me', MeController)

export default router

router.post('/verifyEmail',
  function(req, res, next) {
    const token = req.query.token as string
    if (!token) {
      return res.status(400).send('Token is required in the query parameter')
    }
    knex.transaction(transaction => {
      return EmailVerificationService.validateToken(token, transaction)
    }).then(() => {
      res.send()
    }).catch(next)
  }
)
