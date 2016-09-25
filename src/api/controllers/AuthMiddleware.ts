import * as express from 'express'
import {AuthTokenService} from '../services/AuthTokenService'
import {CustomRequest} from '../models/CustomRequest'

export const AuthMiddleware = {

  isLoggedIn: async function(req: CustomRequest, res: express.Response, next: express.NextFunction) {
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

  isEmailVerifiedLoggedIn: async function(req: CustomRequest, res: express.Response, next: express.NextFunction) {

  }

}
