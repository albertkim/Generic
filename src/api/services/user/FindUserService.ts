import * as Knex from 'knex'
import * as createError from 'http-errors'
import {User, UserSearch} from '../../models/User'
import UserRepository from '../../repositories/UserRepository'

export const FindUserService = {

  findAll: async function(searchObject: UserSearch, transaction?: Knex.Transaction) : Promise<User[]> {
    const users = await UserRepository.findAll(searchObject, transaction)
    return users
  }

}
