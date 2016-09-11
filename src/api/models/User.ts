export class User {

  public id: Number
  public email: String
  public name: String
  public isAdmin: Boolean

  constructor(json: any) {
    this.id = json.id
    this.email = json.email
    this.name = json.name
    this.isAdmin = json.isAdmin
  }

  toJSON() : any {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      isAdmin: this.isAdmin
    }
  }

}
