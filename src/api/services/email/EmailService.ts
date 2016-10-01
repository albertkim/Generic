import {User} from '../../models/User'

type Template = 'Test' | 'EmailVerification' | 'PhoneVerification'

export const EmailService = {

  sendToUser: async function(user: User, template: Template) {

  }

}
