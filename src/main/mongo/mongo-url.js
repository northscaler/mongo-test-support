'use strict'

const fs = require('fs')
const { MissingRequiredArgumentError } = require('@ballistagroup/error-support')

const DEFAULT_PORT_FILENAME = `${__dirname}/default-mongo-test-port`
const DEFAULT_PORT = parseInt(fs.readFileSync(DEFAULT_PORT_FILENAME))

module.exports = ({
  protocol = 'mongodb://',
  host = 'localhost',
  port = DEFAULT_PORT,
  dbName = 'mongotest-local'
} = {}) => {
  protocol = protocol || throw new MissingRequiredArgumentError({ msg: 'protocol' })
  if (!protocol.endsWith('://')) protocol = `${protocol}://`

  host = host || throw new MissingRequiredArgumentError({ msg: 'host' })

  let url = `${protocol}${host}`
  if (!protocol.startsWith('mongodb+srv')) {
    url = `${url}:${parseInt(port || DEFAULT_PORT || throw new MissingRequiredArgumentError({ msg: 'port' }))}`
  }
  url = `${url}/${dbName}`

  return url
}
