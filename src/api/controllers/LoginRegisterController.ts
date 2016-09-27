import {Router} from 'express'
import knex from '../../config/knex'
import {User, UpdateUser, UserWithToken} from '../models/User'
import {LoginUserService, RegisterUserService} from '../services/UserService'
import {AuthMiddleware} from './AuthMiddleware'
import {CustomRequest} from '../models/CustomRequest'

const router = Router()

export default router

router.post('/register',
  async function(req, res, next) {
    try {

      const email = req.body.email
      const password = req.body.password
      const name = req.body.name

      if (!email || email == '' || !email.includes('@')) {
        return res.status(400).send({message: 'A valid email is required'})
      } else if (!password || password == '') {
        return res.status(400).send({message: 'Password is required'})
      }

      const userWithToken: UserWithToken = await knex.transaction(transaction => {
        return RegisterUserService.registerByEmail({
          email: req.body.email,
          password: req.body.password,
          name: req.body.name
        }, transaction)
      })
      res.send(userWithToken)

    } catch (error) {
      next(error)
    }
  }
)

router.post('/login',
  async function(req, res, next) {
    try {
      const email = req.body.email
      const password = req.body.password

      if (!email || email == '' || !email.includes('@')) {
        return res.status(400).send({message: 'A valid email is required'})
      } else if (!password || password == '') {
        return res.status(400).send({message: 'Password is required'})
      }
      
      const userWithToken: UserWithToken = await knex.transaction(transaction => {
        return LoginUserService.login(email, password, transaction)
      })
      res.send(userWithToken)

    } catch (error) {
      next(error)
    }
  }
)
