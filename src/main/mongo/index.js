'use strict'

const mongoConnect = require('./mongo-connect')
const mongooseConnect = require('./mongoose-connect')

module.exports = {
  mongoConnect,
  mongooseConnect,
  defaultPort: mongoConnect.defaultPort,
  defaultContainerName: mongoConnect.defaultContainerName
}
