// Container for all environments
interface Config {
  httpPort: number
  httpsPort: number
  envName: string
}
interface Enviroments {
  staging: Config
  production: Config
}

// Container for all environments
const environments = {} as Enviroments

// Staging (default) environment
environments.staging = {
  'httpPort': 3000,
  'httpsPort': 3001,
  'envName': 'staging'
}

// Production environment
environments.production = {
  'httpPort': 5000,
  'httpsPort': 5001,
  'envName': 'production'
}

// Determine which environment was passed as a command-line argument
const currentEnvironment: string = typeof (process.env.NODE_ENV) === 'string'
  ? process.env.NODE_ENV.toLowerCase()
  : ''

// Check that the current environment is one of the environments above, if not default to staging
const environmentToExport = typeof (environments[currentEnvironment]) === 'object'
  ? environments[currentEnvironment]
  : environments.staging

export const config = environmentToExport
