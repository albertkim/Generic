export class User {

  public id: number
  public email: string
  public password: string
  public name: string
  public isAdmin: boolean

  constructor(json: any) {
    this.id = json.id
    this.email = json.email
    this.password = json.password
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

export interface UserSearch {
  id?: number,
  email?: string,
  isAdmin?: boolean
}

export interface CreateUser {
  email: string,
  password: string,
  name: string
}

export interface UserWithToken {
  user: User,
  authToken: string
}
