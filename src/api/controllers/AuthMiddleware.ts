import {Response, Request, NextFunction} from 'express'
import {AuthTokenService} from '../services/AuthTokenService'
import {User} from '../models/User'
import * as createError from 'http-errors'

export const AuthMiddleware = {

  isLoggedIn: async function(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.headers['authorization']

      if (authorizationHeader == null) {
        return res.status(401).send('You are not logged in')
      }

      const bearerToken = authorizationHeader.replace('bearer ', '').replace('Bearer ', '')
      const user = await AuthTokenService.getUserFromToken(bearerToken)
      req.user = user
      next()
    } catch (error) {
      next(error)
    }
  },

  isEmailVerified: async function(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw createError(401, 'You are not logged in')
      }
      if (!(req.user as User).isEmailVerified) {
        next()
      } else {
        throw createError(401, 'Your email must be verified')
      }
    } catch (error) {
      next(error)
    }
  },

  isAdmin: async function(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw createError(401, 'You are not logged in')
      }
      if (!(req.user as User).isAdmin) {
        next()
      } else {
        throw createError(401, 'Your email must be verified')
      }
    } catch (error) {
      next(error)
    }
  }

}
