import * as express from 'express'
import knex from '../config/knex'
import {User} from '../models/User'
import UserService from '../services/UserService'

const router = express.Router()

export default router

router.post('/register',
  async function(req, res, next) {
    try {
      const email = req.body.email
      const password = req.body.password
      const name = req.body.name

      if (!email || email == '') {
        return res.status(400).send({message: 'Email is required'})
      } else if (!password || password == '') {
        return res.status(400).send({message: 'Password is required'})
      }

      const user: User = await knex.transaction(transaction => {
        return UserService.register({
          email: req.body.email,
          password: req.body.password,
          name: req.body.name
        }, transaction)
      })
      res.send({
        user: user
      })
    } catch (error) {
      next(error)
    }
  }
)
