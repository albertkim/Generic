import * as jwt from 'jsonwebtoken'
import * as Knex from 'knex'
import * as createError from 'http-errors'
import {User} from '../models/User'
import knex from '../../config/knex'

const authTokenColumn = 'authToken'
const privateKey = 'genericPrivateKey'

export const AuthTokenService = {

  getUserFromToken: async function(authToken: string) : Promise<User> {
    const subQuery = knex(authTokenColumn).where('token', authToken).select('userId')
    const response = await knex('user').where('id', 'in', subQuery)
    const userObjectArray = response as any as Array<any>
    if (userObjectArray.length > 0) {
      return new User(userObjectArray[0])
    } else {
      throw createError(401, 'Invalid http bearer token')
    }
  },

  createAuthToken: async function(userId: Number, transaction: Knex.Transaction): Promise<string> {
    const token = jwt.sign({
      userId: userId,
      createDate: new Date()
    }, privateKey)
    await knex('authToken').insert({
      userId: userId,
      token: token,
      createDate: new Date()
    })
    return token
  },

}
