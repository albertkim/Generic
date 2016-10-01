import {Router} from 'express'
import knex from '../../../config/knex'
import {User, UpdateUser} from '../../models/User'
import {UserNotificationPreferenceService} from '../../services/NotificationPreferenceService'
import {AuthMiddleware} from '../AuthMiddleware'
import {UpdateUserService} from '../../services/user/UpdateUserService'

const router = Router()

export default router

router.get('/',
  AuthMiddleware.isLoggedIn,
  function(req, res, next) {
    res.send(req.user)
  }
)

router.get('/notificationPreferences',
  AuthMiddleware.isLoggedIn,
  function(req, res, next) {
    UserNotificationPreferenceService.getByUser(req.user).then(userPreferences => {
      res.send(userPreferences)
    }).catch(next)
  }
)

router.patch('/',
  AuthMiddleware.isLoggedIn,
  async function(req, res, next) {
    try {
      const updateUser: UpdateUser = {
        id: req.user.id
      }
      if ('phone' in req.body) { updateUser.phone = req.body.phone }
      if ('name' in req.body) { updateUser.name = req.body.name }

      const user: User = await knex.transaction(transaction => {
        return UpdateUserService.update(updateUser, transaction)
      })
      res.send(user)
    } catch (error) {
      next(error)
    }
  }
)
