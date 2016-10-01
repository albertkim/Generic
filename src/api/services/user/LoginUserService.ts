import * as Knex from 'knex'
import * as createError from 'http-errors'
import {UserWithToken} from '../../models/User'
import {AuthTokenService} from '../AuthTokenService'
import UserRepository from '../../repositories/UserRepository'

export const LoginUserService = {

  login: async function(email: string, password: string, transaction: Knex.Transaction): Promise<UserWithToken> {
    const user = await UserRepository.getByEmailAndPassword(email, password, transaction)
    const token = await AuthTokenService.createAuthToken(user.id, transaction)
    return {
      user: user,
      authToken: token
    }
  }

}
