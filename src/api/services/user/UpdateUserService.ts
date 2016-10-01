import * as Knex from 'knex'
import {User, UpdateUser} from '../../models/User'
import {FindUserService} from './FindUserService'
import UserRepository from '../../repositories/UserRepository'

export const UpdateUserService = {

  update: async function(updateUser: UpdateUser, transaction: Knex.Transaction): Promise<User|undefined> {
    return await UserRepository.updateUser(updateUser, transaction)
  }

}
