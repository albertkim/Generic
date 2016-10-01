import {Router} from 'express'
import knex from '../../config/knex'
import {UserWithToken} from '../models/User'
import {RegisterUserService} from '../services/user/RegisterUserService'
import {LoginUserService} from '../services/user/LoginUserService'
import {CustomRequest} from '../models/CustomRequest'

const router = Router()

export default router

router.post('/register',
  async function(req, res, next) {
    try {

      const email = req.body.email as string
      const password = req.body.password as string
      const name = req.body.name as string

      if (!email || email === '' || !email.includes('@')) {
        return res.status(400).send({message: 'A valid email is required'})
      } else if (!password || password === '') {
        return res.status(400).send({message: 'Password is required'})
      }

      const userWithToken: UserWithToken = await knex.transaction(transaction => {
        return RegisterUserService.registerByEmail({
          email: email,
          password: password,
          name: name
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

      if (!email || email === '' || !email.includes('@')) {
        return res.status(400).send({message: 'A valid email is required'})
      } else if (!password || password === '') {
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
