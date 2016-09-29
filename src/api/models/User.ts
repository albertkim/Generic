export class User {

  public id: number
  public email: string
  public password: string
  public name: string
  public phone: string
  public isAdmin: boolean
  public isEmailVerified: boolean
  public isPhoneVerified: boolean

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
      isEmailVerified: !!this.isEmailVerified,
      name: this.name,
      phone: this.phone,
      isPhoneVerified: !!this.isPhoneVerified,
      isAdmin: !!this.isAdmin
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

export interface UpdateUser {
  id: number,
  phone?: string,
  name?: string
}

export interface UserWithToken {
  user: User,
  authToken: string
}
