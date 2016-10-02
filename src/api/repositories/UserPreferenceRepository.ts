import * as Knex from 'knex'
import knex from '../../config/knex'
import {User} from '../models/User'
import {Preference, UserPreference, IUserPreferenceUpdate} from '../models/userPreference'

const preferencesTableName = 'preferences'
const userPreferencesTableName = 'userPreferences'

export default {

  getByUser: async function(user: User) {
    const preferencesResult: any[] = await knex(preferencesTableName)
    const userPreferencesResult: any[] = await knex(userPreferencesTableName).where('userId', user.id)

    const preferences = preferencesResult.map(preference => {
      return new Preference(preference)
    })

    const userPreferences: UserPreference[] = []
    preferences.forEach(preference => {
      let foundUserPreference = userPreferencesResult.find(object => object.preferenceId === preference.id)
      if (foundUserPreference != null) {
        userPreferences.push(new UserPreference({
          userId: user.id,
          preference: preference,
          value: foundUserPreference.value
        }))
      } else {
        userPreferences.push(new UserPreference({
          userId: user.id,
          preference: preference,
          value: preference.defaultValue
        }))
      }
    })

    return userPreferences
  },

  update: async function(updateObject: IUserPreferenceUpdate) {
    // Delete existing user preference first
    await knex(userPreferencesTableName).where({
      userId: updateObject.userId,
      preferenceId: updateObject.preferenceId
    }).del()

    // Add new user preference
    await knex(userPreferencesTableName).insert(updateObject)
  }

}
