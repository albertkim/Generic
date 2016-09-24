import {User} from '../models/User'
import knex from '../config/knex'
import * as createError from 'http-errors'

export const AuthTokenService = {

  getUserFromToken: async function(authToken: string) : Promise<User> {
    const subQuery = knex('authToken').where('token', authToken)
    const response = await knex('user').where('id', 'in', subQuery)
    const userObjectArray = response as any as Array<any>
    if (userObjectArray.length > 0) {
      return new User(userObjectArray[0])
    } else {
      throw createError(401, 'Invalid http bearer token')
    }
  }

}
