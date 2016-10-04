import * as Knex from 'knex'
import CompanyRepository from '../../repositories/CompanyRepository'
import {IUpdateCompany} from '../../models/Company'

export const UpdateCompanyService = {

  update: async function(updateObject: IUpdateCompany, transaction: Knex.Transaction) {
    return await CompanyRepository.update(updateObject, transaction)
  }

}
