import * as createError from 'http-errors'
import {User} from '../models/User'
import {Company, ICreateCompany, IUpdateCompany, ICreateCompanyUser} from '../models/Company'
import * as Knex from 'knex'
import knex from '../../config/knex'

async function findById(companyId: number, transaction?: Knex.Transaction): Promise<Company|null>{
  const query = knex('company').where('id', companyId)
  const result: any = transaction ? await query.transacting(transaction) : await query
  const resultArray = <Array<any>> result
  if (resultArray.length === 0) {
    return null
  } else {
    return new Company(resultArray[0])
  }
}

async function getById(companyId: number, transaction?: Knex.Transaction): Promise<Company> {
  const company = await findById(companyId, transaction)
  if (!company) {
    throw createError(404, `Company ${companyId} does not exist`)
  } else {
    return company
  }
}

export default {

  findById: findById,

  getById: getById,

  create: async function(createObject: ICreateCompany, transaction: Knex.Transaction): Promise<Company> {
    const create: any = Object.assign({}, createObject)
    create.createDate = new Date()
    const result: any[] = await knex('company').insert(create).transacting(transaction)
    const companyId = result[0]
    const company = await getById(companyId, transaction)
    return company
  },

  createCompanyUser: async function(companyUser: ICreateCompanyUser, transaction: Knex.Transaction) {
    await knex('companyUser').insert({
      userId: companyUser.user.id,
      companyId: companyUser.company.id,
      role: companyUser.role
    })
  },

  update: async function(updateObject: IUpdateCompany, transaction: Knex.Transaction) {
    await knex('company').where('id', updateObject.id).update(updateObject)
    return await getById(updateObject.id)
  }

}
