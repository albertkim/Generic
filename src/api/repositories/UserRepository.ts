import {User} from '../models/User'
import * as Knex from 'knex'
import knex from '../config/knex'

export default {

  findAll: async function(searchObject: any, transaction: Knex.Transaction) : Promise<User[]> {
    const result: any = await knex('user').transacting(transaction)
    const resultArray = <Array<any>> result
    const users = resultArray.map(userObject => new User(userObject))
    return users
  },

  create: async function(userObject: any, transaction: Knex.Transaction) : Promise<User> {
    const result = await knex('user').insert(userObject).transacting(transaction)
    const user = new User(result)
    return user
  }

}
