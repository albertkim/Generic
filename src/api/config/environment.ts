const rawEnvironmentString: String = process.env.NODE_ENV
const environmentString = (rawEnvironmentString != undefined) ? rawEnvironmentString.toUpperCase() : 'DEVELOPMENT'

interface Environment {
  environment: String,
  isProduction: Boolean,
  isStaging: Boolean,
  isDevelopment: Boolean
}

const environment: Environment = {
  environment: environmentString,
  isProduction: environmentString == 'PROUDCTION',
  isStaging: environmentString == 'STAGING',
  isDevelopment: environmentString == 'DEVELOPMENT'
}

export default environment
