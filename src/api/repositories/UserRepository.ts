import * as createError from 'http-errors'
import * as bcrypt from 'bcrypt-nodejs'
import {User, CreateUser, UpdateUser, UserSearch} from '../models/User'
import * as Knex from 'knex'
import knex from '../../config/knex'

async function findById(userId: number, transaction?: Knex.Transaction): Promise<User|undefined>{
  const query = knex('user').where('id', userId)
  const result: any = transaction ? await query.transacting(transaction) : await query
  const resultArray = <Array<any>> result
  if (resultArray.length === 0) {
    return undefined
  } else {
    return new User(resultArray[0])
  }
}

async function getById(userId: number, transaction?: Knex.Transaction): Promise<User> {
  const user = await findById(userId, transaction)
  if (!user) {
    throw createError(404, `User ${userId} does not exist`)
  } else {
    return user
  }
}

async function findByEmail(email: string, transaction?: Knex.Transaction): Promise<User|null> {
  const query = knex('user').where('email', email)
  const result: any = transaction ? await query.transacting(transaction) : await query
  const resultArray = <Array<any>> result
  if (resultArray.length === 0) {
    return null
  } else {
    return new User(resultArray[0])
  }
}

export default {

  findById: findById,

  findByEmail: findByEmail,

  getById: getById,

  getByEmailAndPassword: async function(email: string,
                                        password: string,
                                        transaction?: Knex.Transaction): Promise<User> {
    const user = await findByEmail(email, transaction)
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw createError(401, 'Incorrect email or password')
    } else {
      return user
    }
  },

  findAll: async function(searchObject: UserSearch, transaction?: Knex.Transaction): Promise<User[]> {
    const query = knex('user')
    const result: any = transaction ? await query.transacting(transaction) : await query
    const resultArray = <Array<any>> result
    const users = resultArray.map(userObject => new User(userObject))
    return users
  },

  create: async function(userObject: CreateUser, transaction: Knex.Transaction): Promise<User> {
    const createObject: any = JSON.parse(JSON.stringify(userObject)) // Clone userObject, don't modify it
    // Hash the password
    createObject.password = bcrypt.hashSync(userObject.password)
    createObject.createDate = new Date()
    const query = knex('user').insert(createObject)
    const result: any[] = await query.transacting(transaction)
    const userId = result[0]
    const user = await getById(userId, transaction)
    return user
  },

  updateUser: async function(updateObject: UpdateUser, transaction: Knex.Transaction) {
    const query = knex('user').where('id', updateObject.id).update(updateObject)
    transaction ? await query.transacting(transaction): await query
    return await getById(updateObject.id)
  }

}
