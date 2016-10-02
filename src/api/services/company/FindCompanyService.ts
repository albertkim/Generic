import * as Knex from 'knex'
import {Company} from '../../models/Company'
import CompanyRepository from '../../repositories/CompanyRepository'

export const FindCompanyService = {

  getById: async function(companyId: number, transaction?: Knex.Transaction): Promise<Company> {
    return await CompanyRepository.getById(companyId, transaction)
  }

}
