import * as Knex from 'knex'
import * as createError from 'http-errors'
import {User, CreateUser, UserSearch, UserWithToken} from '../models/User'
import UserRepository from '../repositories/UserRepository'

export default {

  findAll: async function(searchObject: UserSearch, transaction: Knex.Transaction) : Promise<User[]> {
    const users = await UserRepository.findAll(searchObject, transaction)
    return users
  },

  registerByEmail: async function(userObject: CreateUser, transaction: Knex.Transaction) : Promise<UserWithToken> {
    const existingUser = await UserRepository.findByEmail(userObject.email, transaction)
    if (existingUser) {
      throw createError(401, `Email ${userObject.email} already exists`)
    }

    const user = await UserRepository.create(userObject, transaction)
    const token = await UserRepository.createAuthToken(user.id, transaction)
    console.log(`User ${userObject.email} registered via email`)
    return {
      user: user,
      authToken: token
    }
  },

  login: async function(email: string, password: string, transaction: Knex.Transaction) : Promise<UserWithToken> {
    const user = await UserRepository.getByEmailAndPassword(email, password, transaction)
    const token = await UserRepository.createAuthToken(user.id, transaction)
    return {
      user: user,
      authToken: token
    }
  }

}
