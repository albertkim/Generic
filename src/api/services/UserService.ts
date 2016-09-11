import * as Knex from 'knex'
import {User} from '../models/User'
import UserRepository from '../repositories/UserRepository'

interface CreateUserInterface {
  email: String,
  password: String,
  name: String
}

export default {

  findAll: async function(searchObject: any, transaction: Knex.Transaction): Promise<User[]> {
    const users = await UserRepository.findAll(searchObject, transaction)
    return users
  },

  register: async function(userObject: CreateUserInterface, transaction: Knex.Transaction): Promise<User> {
    console.log(`Register user ${userObject.email} via email`)
    const user = await UserRepository.create(userObject, transaction)
    return user
  }

}
