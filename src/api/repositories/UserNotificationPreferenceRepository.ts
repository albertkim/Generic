import * as Knex from 'knex'
import knex from '../../config/knex'
import {User} from '../models/User'
import {NotificationPreference, UserNotificationPreference} from '../models/userNotificationPreference'

const notificationPreferences = 'notificationPreferences'
const userNotificationPreferences = 'userNotificationPreferences'

export default {

  getByUser: async function(user: User) {
    const preferencesResult: any[] = await knex(notificationPreferences)
    const userPreferencesResult: any[] = await knex(userNotificationPreferences).where('userId', user.id)

    const preferences = preferencesResult.map(preference => {
      return new NotificationPreference(preference)
    })

    const userPreferences: UserNotificationPreference[] = []
    preferences.forEach(preference => {
      let foundUserPreference = userPreferencesResult.find(object => object.notificationPreferenceId === preference.id)
      if (foundUserPreference != null) {
        userPreferences.push(new UserNotificationPreference({
          userId: user.id,
          preference: preference,
          value: foundUserPreference.value
        }))
      } else {
        userPreferences.push(new UserNotificationPreference({
          userId: user.id,
          preference: preference,
          value: preference.defaultValue
        }))
      }
    })

    return userPreferences
  }

}
