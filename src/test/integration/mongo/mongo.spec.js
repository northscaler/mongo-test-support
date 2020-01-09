/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const m = require('../../../main/mongo')

const testWith = async asyncFn => async () => {
  const db = await asyncFn({
    host: process.env.MONGO_TEST_SUPPORT_MONGODB_HOST || 'localhost',
    port: process.env.MONGO_TEST_SUPPORT_MONGODB_PORT || m.mongoConnect.defaultPort
  })
  expect(db).to.be.ok()
}

describe('integration tests of mongo', function () {
  describe('mongo-connect', function () {
    it('should work', async function () {
      this.timeout(5000)
      return testWith(m.mongoConnect)
    })
  })

  describe('mongoose-connect', function () {
    it('should work', async function () {
      this.timeout(5000)
      return testWith(m.mongooseConnect)
    })
  })
})
