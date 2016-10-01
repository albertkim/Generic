import * as jwt from 'jsonwebtoken'
import * as Knex from 'knex'
import * as createError from 'http-errors'
import knex from '../../../config/knex'
import {User} from '../../models/User'
import {EmailService} from '../email/EmailService'

const emailVerificationTable = 'emailVerification'

function generateToken(): string {
  return 'asdf'
}

async function sendEmail(user: User, token: string) {
  await EmailService.sendToUser(user, 'EmailVerification')
}

export const EmailVerificationService = {

  createAndSendTokenEmail: async function(user: User, transaction: Knex.Transaction) {
    // Check if an email verification token already exists.
    const result: any[] = await knex(emailVerificationTable).where('userId', user.id)
    if (result.length > 0) {

      const token = result[0].token as string
      sendEmail(user, token)

    } else {

      const token = generateToken()
      await knex(emailVerificationTable).insert({
        userId: user.id,
        token: token
      }).transacting(transaction)
      sendEmail(user, token)

    }
  },

  validateToken: async function(token: string, transaction: Knex.Transaction) {
    // Check if token is correct
    const result: any[] = await knex(emailVerificationTable).where('token', token)
    if (result.length === 0) {
      throw createError(401, 'Invalid email verification token')
    }
    const userId: number = result[0].userId

    // If token is correct, delete all tokens from this user
    await knex(emailVerificationTable).where('userId', userId).del().transacting(transaction)
  }

}
