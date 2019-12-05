'use strict'

const fs = require('fs')
const _ = require('lodash')
const mongoose = require('mongoose')

const startMongo = require('./start-mongodb')
const mongoUrl = require('./mongo-url')

let connection

const fn = async ({
  protocol,
  host,
  port,
  dbName,
  opts = {
    autoIndex: true,
    bufferCommands: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
} = {}) => {
  if (connection) return connection

  await startMongo()

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
