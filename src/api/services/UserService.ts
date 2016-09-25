import * as Knex from 'knex'
import * as createError from 'http-errors'
import {User, CreateUser, UpdateUser, UserSearch, UserWithToken} from '../models/User'
import UserRepository from '../repositories/UserRepository'

export const FindUserService = {

  findAll: async function(searchObject: UserSearch, transaction?: Knex.Transaction) : Promise<User[]> {
    const users = await UserRepository.findAll(searchObject, transaction)
    return users
  }

}

export const RegisterUserService = {

  registerByEmail: async function(userObject: CreateUser, transaction?: Knex.Transaction) : Promise<UserWithToken> {
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
  }

}

export const LoginUserService = {

  login: async function(email: string, password: string, transaction?: Knex.Transaction) : Promise<UserWithToken> {
    const user = await UserRepository.getByEmailAndPassword(email, password, transaction)
    const token = await UserRepository.createAuthToken(user.id, transaction)
    return {
      user: user,
      authToken: token
    }
  }

}

export const UpdateUserService = {

  update: async function(updateUser: UpdateUser, transaction: Knex.Transaction) : Promise<User|undefined> {
    return undefined
  }

}
