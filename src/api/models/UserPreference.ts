export class Preference {
  public id: number
  public name: string
  public category: string
  public defaultValue: boolean

  constructor(json: any) {
    this.id = json.id
    this.name = json.name
    this.category = json.category
    this.defaultValue = json.defaultValue
  }
}

export interface IUserPreferenceUpdate {
  userId: number
  preferenceId: number,
  value: boolean
}

export class UserPreference {
  public userId: number
  public preference: Preference
  public value: boolean

  constructor(json: any) {
    this.userId = json.userId
    this.preference = new Preference(json.preference)
    this.value = !!json.value
  }
}
