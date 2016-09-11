import environment from './environment'

interface ConnectionConfig {
  host: String,
  user: String,
  password: String,
  database: String,
  charset: String
}

interface DatabaseConfig {
  client: String,
  connection: ConnectionConfig
}

const developmentConfig: DatabaseConfig = {
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'password',
    database : 'generic',
    charset  : 'utf8'
  }
}

let environmentDatabaseConfig: DatabaseConfig

if (environment.isDevelopment) {
  environmentDatabaseConfig = developmentConfig
} else {
  throw new Error('Not implemeneted yet')
}

export default environmentDatabaseConfig
