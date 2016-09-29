export class NotificationPreference {
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

export class UserNotificationPreference {
  public userId: number
  public preference: NotificationPreference
  public value: boolean

  constructor(json: any) {
    this.userId = json.userId
    this.preference = new NotificationPreference(json.preference)
    this.value = !!json.value
  }
}
