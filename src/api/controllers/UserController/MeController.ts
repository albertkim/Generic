import * as createError from 'http-errors'
import {Router} from 'express'
import knex from '../../../config/knex'
import {User, UpdateUser} from '../../models/User'
import {UserNotificationPreferenceService} from '../../services/NotificationPreferenceService'
import {AuthMiddleware} from '../AuthMiddleware'
import {UpdateUserService} from '../../services/user/UpdateUserService'
import {CompanyUserService} from '../../services/company/CompanyUserService'

const router = Router()

export default router

router.get('/',
  AuthMiddleware.isLoggedIn,
  function(req, res, next) {
    res.send(req.user)
  }
)

router.get('/companies',
  AuthMiddleware.isLoggedIn,
  function(req, res, next) {
    CompanyUserService.getByUser(req.user)
    .then((companyUsers: any) => {
      res.send(companyUsers)
    }).catch(next)
  }
)

router.get('/preferences',
  AuthMiddleware.isLoggedIn,
  function(req, res, next) {
    UserNotificationPreferenceService.getByUser(req.user).then(userPreferences => {
      res.send({
        userPreferences: userPreferences
      })
    }).catch(next)
  }
)

router.patch('/preferences',

  AuthMiddleware.isLoggedIn,
  function(req, res, next) {
    if (req.body.preferenceId === undefined || req.body.value === undefined) {
      return next(createError(400, `Preference id and value fields are required.`))
    }
    const preferenceId = parseInt(req.body.preferenceId)
    const value = !!req.body.value
    UserNotificationPreferenceService.update({
      userId: req.user.id,
      preferenceId: preferenceId,
      value: value
    }).then(() => {
      res.send()
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
