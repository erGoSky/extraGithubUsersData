/* eslint-disable no-unused-vars */
import path from 'path'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    masterKey: requireProcessEnv('MASTER_KEY'),
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    }
  },
  test: {
    mongo: {
//      uri: 'mongodb://localhost/extra-github-users-data-test',
      uri: 'mongodb+srv://admin:admin_admin@cluster0-4ta83.mongodb.net/test',//'mongodb://localhost/extra-github-users-data-dev',
      options: {
        debug: false
      }
    }
  },
  development: {
    mongo: {
      uri: 'mongodb://admin:admin_admin@cluster0-shard-00-00-4ta83.mongodb.net:27017,cluster0-shard-00-01-4ta83.mongodb.net:27017,cluster0-shard-00-02-4ta83.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',//'mongodb://localhost/extra-github-users-data-dev',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/extra-github-users-data'
    }
  }
}

module.exports = Object.assign(config.all, config[config.all.env])
export default module.exports
