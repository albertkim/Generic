import {User} from '../models/User'
import {IUserPreferenceUpdate} from '../models/UserPreference'
import UserNotificationPreferenceRepository from '../repositories/UserPreferenceRepository'

export const UserNotificationPreferenceService = {

  getByUser: async function(user: User) {
    return await UserNotificationPreferenceRepository.getByUser(user)
  },

  update: async function(userPreferenceUpdate: IUserPreferenceUpdate) {
    return await UserNotificationPreferenceRepository.update(userPreferenceUpdate)
  }

}
