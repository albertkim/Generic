import * as Knex from 'knex'
import {User, UserSearch} from '../../models/User'
import UserRepository from '../../repositories/UserRepository'

export const FindUserService = {

  getById: async function(id: number, transaction?: Knex.Transaction): Promise<User> {
    return await UserRepository.getById(id, transaction)
  },

  findAll: async function(searchObject: UserSearch, transaction?: Knex.Transaction): Promise<User[]> {
    const users = await UserRepository.findAll(searchObject, transaction)
    return users
  }

}
