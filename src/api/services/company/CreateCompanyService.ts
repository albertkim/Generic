import * as Knex from 'knex'
import {User} from '../../models/User'
import {Company, ICreateCompany} from '../../models/Company'
import CompanyRepository from '../../repositories/CompanyRepository'

export const CreateCompanyService = {

  create: async function(user: User, createObect: ICreateCompany, transaction: Knex.Transaction): Promise<Company> {
    const company = await CompanyRepository.create(createObect, transaction)
    await CompanyRepository.createCompanyUser({
      user: user,
      company: company,
      role: 'Owner'
    }, transaction)
    return company
  }

}
