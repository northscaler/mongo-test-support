'use strict'

const fs = require('fs')
const _ = require('lodash')
const MongoClient = require('mongodb').MongoClient

const startMongo = require('./start-mongodb')
const mongoUrl = require('./mongo-url')

let connection

const fn = async ({
  protocol,
  host,
  port,
  dbName,
  opts = {
    useNewUrlParser: true
  }
} = {}) => {
  if (connection) return connection

  await startMongo()

  const url = mongoUrl({ protocol, host, port, dbName })

  opts = _.cloneDeep(opts) || {}
  if (!opts.auth?.user || !opts.auth?.password) {
    try { delete opts.auth } catch (e) { /* gulp */ }
  }

  const mongoClient = await MongoClient.connect(url, opts)
  connection = await mongoClient.db()
  connection.client = mongoClient

  return connection
}

fn.defaultPort = parseInt(fs.readFileSync(`${__dirname}/default-mongo-test-port`))
fn.defaultContainerName = fs.readFileSync(`${__dirname}/default-mongo-test-container`)

module.exports = fn
