import {User} from './User'

export interface ICreateCompany {
  name: string
}

export interface IUpdateCompany {
  id: number,
  name?: string,
  description?: string,
  primaryPhone?: string,
  secondaryPhone?: string,
}

export interface ICreateCompanyUser {
  user: User,
  company: Company,
  role: 'Owner' | 'Employee' | 'Guest'
}

export interface ICompanyUser {
  user: User,
  company: Company,
  role: string
}

export class Company {

  public id: number
  public name: string
  public description: string
  public primaryPhone: string
  public secondaryPhone: string
  public isCompanyVerified: boolean
  public createDate: Date

  constructor(json: any) {
    this.id = json.id
    this.name = json.name
    this.description = json.description
    this.primaryPhone = json.primaryPhone
    this.secondaryPhone = json.secondaryPhone
    this.isCompanyVerified = json.isCompanyVerified
    this.createDate = json.createDate
  }

}
