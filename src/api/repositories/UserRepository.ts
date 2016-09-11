import * as jwt from 'jsonwebtoken'
import * as createError from 'http-errors'
import {User, CreateUser, UserSearch} from '../models/User'
import * as Knex from 'knex'
import knex from '../config/knex'

const privateKey = 'genericPrivateKey'

async function findById(userId: number, transaction: Knex.Transaction) : Promise<User> {
  const result: any = await knex('user').where('id', userId).transacting(transaction)
  const resultArray = <Array<any>> result
  if (resultArray.length == 0) {
    return null
  } else {
    return new User(resultArray[0])
  }
}

export default {

  findById: findById,

  getById: async function(userId: number, transaction: Knex.Transaction) : Promise<User> {
    const user = await findById(userId, transaction)
    if (!user) {
      throw createError(404, `User ${userId} does not exist`)
    } else {
      return user
    }
  },

  findAll: async function(searchObject: UserSearch, transaction: Knex.Transaction) : Promise<User[]> {
    const result: any = await knex('user').transacting(transaction)
    const resultArray = <Array<any>> result
    const users = resultArray.map(userObject => new User(userObject))
    return users
  },

  create: async function(userObject: CreateUser, transaction: Knex.Transaction) : Promise<User> {
    const result: any = await knex('user').insert(userObject).transacting(transaction)
    const resultArray = <Array<any>> result
    const userId = resultArray[0]
    const user = await findById(userId, transaction)
    return user
  },
  
  createAuthToken: async function(userId: Number, transaction: Knex.Transaction) : Promise<String> {
    const token = jwt.sign({
      userId: userId,
      createDate: new Date()
    }, privateKey)
    await knex('authToken').insert({
      userId: userId,
      token: token
    }).transacting(transaction)
    return token
  }

}
