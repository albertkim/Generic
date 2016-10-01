import * as Knex from 'knex'
import * as createError from 'http-errors'
import {User, UpdateUser} from '../../models/User'
import UserRepository from '../../repositories/UserRepository'

export const UpdateUserService = {

  update: async function(updateUser: UpdateUser, transaction: Knex.Transaction) : Promise<User|undefined> {
    return undefined
  }

}
