'use strict'

const fs = require('fs')
const _ = require('lodash')
const mongoose = require('mongoose')

const startMongo = require('./start-mongo')
const mongoUrl = require('./mongo-url')

let connection

const fn = async ({
  protocol = 'mongodb://',
  host = 'localhost',
  port = fn.defaultPort,
  dbName = 'testdb',
  containerName = fn.defaultContainerName,
  opts = {
    autoIndex: true,
    bufferCommands: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
} = {}) => {
  if (connection) return connection

  const scriptArgs = [containerName, port]
  await startMongo({ scriptArgs })

  opts = _.cloneDeep(opts)

  const url = mongoUrl({ protocol, host, port, dbName })

  return new Promise((resolve, reject) => {
    connection = mongoose.createConnection(url, opts)
    connection.once('error', reject)
    connection.once('connected', () => resolve(connection))
  })
}

fn.defaultPort = parseInt(fs.readFileSync(`${__dirname}/default-mongo-test-port`))
fn.defaultContainerName = fs.readFileSync(`${__dirname}/default-mongo-test-container`)

module.exports = fn
