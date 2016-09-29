import {User} from '../models/User'
import UserNotificationPreferenceRepository from '../repositories/UserNotificationPreferenceRepository'

export const UserNotificationPreferenceService = {

  getByUser: async function(user: User) {
    return await UserNotificationPreferenceRepository.getByUser(user)
  }

}