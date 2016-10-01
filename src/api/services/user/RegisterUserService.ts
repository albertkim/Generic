import * as Knex from 'knex'
import * as createError from 'http-errors'
import {CreateUser, UserWithToken} from '../../models/User'
import {AuthTokenService} from '../AuthTokenService'
import {EmailVerificationService} from './EmailVerificationService'
import UserRepository from '../../repositories/UserRepository'

export const RegisterUserService = {

  registerByEmail: async function(userObject: CreateUser, transaction: Knex.Transaction): Promise<UserWithToken> {
    const existingUser = await UserRepository.findByEmail(userObject.email, transaction)
    if (existingUser) {
      throw createError(401, `Email ${userObject.email} already exists`)
    }

    const user = await UserRepository.create(userObject, transaction)
    const token = await AuthTokenService.createAuthToken(user.id, transaction)

    await EmailVerificationService.createAndSendTokenEmail(user, transaction)

    console.log(`User ${userObject.email} registered via email`)
    return {
      user: user,
      authToken: token
    }
  }

}
