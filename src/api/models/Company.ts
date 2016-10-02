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
