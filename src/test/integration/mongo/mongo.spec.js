/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const uuid = require('uuid').v4
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

  describe('dropCollections', function () {
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

      async function assertCollection ({ name, exists }) {
        const names = (await db.collections()).map(it => it.collectionName)
        const index = names.findIndex(it => it === name)

        if (exists) expect(index).to.be.at.least(0)
        else expect(index).to.equal(-1)
      }

      const names = [uuid(), uuid()]
      await db.createCollection(names[0])
      assertCollection({ name: names[0], exists: true })

      await m.dropCollections({ db, names: names[0] })
      assertCollection({ name: names[0], exists: false })

      await db.createCollection(names[0])
      assertCollection({ name: names[0], exists: true })
      await db.createCollection(names[1])
      assertCollection({ name: names[1], exists: true })

      await m.dropCollections({ db })
      assertCollection({ name: names[0], exists: false })
      assertCollection({ name: names[1], exists: false })

      await db.createCollection(names[0])
      assertCollection({ name: names[0], exists: true })
      await db.createCollection(names[1])
      assertCollection({ name: names[1], exists: true })

      await m.dropCollections({ db, names: [] })
      assertCollection({ name: names[0], exists: true })
      assertCollection({ name: names[1], exists: true })
    })
  })
})
