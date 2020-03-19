/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const m = require('../../../main')

describe('integration tests of mongo', function () {
  describe('mongo-connect', function () {
    it('should work', async function () {
      if (process.env.CI) {
        console.log('not running tests because in CI pipeline')
        return
      }

      this.timeout(5000)

      const db = await m.mongoConnect({
        host: 'localhost',
        port: process.env.MONGO_TEST_SUPPORT_MONGO_PORT || m.mongoConnect.defaultPort
      })

      expect(db).to.be.ok()
    })
  })

  describe('mongoose-connect', function () {
    it('should work', async function () {
      if (process.env.CI) {
        console.log('not running tests because in CI pipeline')
        return
      }

      this.timeout(5000)

      const db = await m.mongooseConnect({
        host: 'localhost',
        port: process.env.MONGO_TEST_SUPPORT_MONGO_PORT || m.mongoConnect.defaultPort
      })

      expect(db).to.be.ok()
    })
  })
})
