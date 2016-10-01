'use strict'

const databaseName = 'generic'

const environment = process.argv[2]
console.log(`Environment: ${environment}`)
console.log('Initializing database...')

if (!environment) {
  throw new Error('Environment must be included, one of: localhost, staging, production')
}

const recreateDatabase = `drop database if exists ${databaseName}; create database ${databaseName}; use ${databaseName}; `
const migration0 = require('fs').readFileSync(__dirname + '/0-init.sql', 'utf8')

if (environment === 'localhost') {

  const localhostConfig = {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'password',
    database : databaseName,
    charset  : 'utf8',
    multipleStatements: true
  }

  const database = require('mysql-promise')()
  database.configure(localhostConfig)
  database.query(recreateDatabase + migration0).then(() => {
    console.log('Migration done')
    process.exit(0)
  }).catch(error => {
    console.error(error)
    process.exit(1)
  })

} else {
  throw new Error('Not implemented yet')
}
