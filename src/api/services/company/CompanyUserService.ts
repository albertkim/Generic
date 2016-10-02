import {User} from '../../models/User'
import {ICompanyUser} from '../../models/Company'
import CompanyRepository from '../../repositories/CompanyRepository'

export const CompanyUserService = {

  getByUser: async function(user: User): Promise<ICompanyUser[]> {
    const companyUsers = await CompanyRepository.getCompanyUsersByUser(user)
    return companyUsers
  }

}
