import * as Knex from 'knex'
import {User, CreateUser, UserSearch, UserWithToken} from '../models/User'
import UserRepository from '../repositories/UserRepository'

export default {

  findAll: async function(searchObject: UserSearch, transaction: Knex.Transaction): Promise<User[]> {
    const users = await UserRepository.findAll(searchObject, transaction)
    return users
  },

  registerByEmail: async function(userObject: CreateUser, transaction: Knex.Transaction): Promise<UserWithToken> {
    console.log(`User ${userObject.email} registered via email`)
    const user = await UserRepository.create(userObject, transaction)
    const token = await UserRepository.createAuthToken(user.id, transaction)
    return {
      user: user,
      authToken: token
    }
  }

}
