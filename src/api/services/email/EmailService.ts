import {User} from '../../models/User'

export interface EmailOptions {
  template: 'Test' | 'VerifyEmail' | 'VerifyPhone',
  user: User,
  payload: any
}

export const EmailService = {

  sendToUser: async function(user: User, options: EmailOptions) {
    console.log(`Sending email to ${user.email} with payload`, options.payload)
    console.warn(`Not implemented yet!`)
  }

}
