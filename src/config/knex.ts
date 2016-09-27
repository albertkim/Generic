import * as Knex from 'knex'
import database from './database'

const knex = Knex(<any> database)

export default knex
