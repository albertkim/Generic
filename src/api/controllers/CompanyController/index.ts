import {Router} from 'express'
import knex from '../../../config/knex'
import {FindCompanyService} from '../../services/company/FindCompanyService'
import {CreateCompanyService} from '../../services/company/CreateCompanyService'
import {UpdateCompanyService} from '../../services/company/UpdateCompanyService'
import {AuthMiddleware} from '../AuthMiddleware'
import * as createError from 'http-errors'

const router = Router()

export default router

router.get('/:companyId',
  AuthMiddleware.isLoggedIn,
  function(req, res, next) {
    FindCompanyService.getById(req.params.companyId).then(company => {
      res.send(company)
    }).catch(next)
  }
)

router.post('/',
  AuthMiddleware.isLoggedIn,
  function(req, res, next) {
    if (!req.body.name || req.body.name === '') {
      return next(createError(400, `You must provide a name for your company`))
    }
    knex.transaction(transaction => {
      return CreateCompanyService.create(req.user, {
        name: req.body.name
      }, transaction)
    }).then((company: any) => {
      res.send(company)
    }).catch(next)
  }
)

router.patch('/:companyId',
  AuthMiddleware.isLoggedIn,
  function(req, res, next) {
    const companyId = parseInt(req.params.companyId)
    knex.transaction(transaction => {
      const updateObject = req.body
      updateObject.id = companyId
      return UpdateCompanyService.update(updateObject, transaction)
    }).then((company: any) => {
      res.send(company)
    }).catch(next)
  }
)
