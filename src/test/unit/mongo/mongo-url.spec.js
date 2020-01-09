/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const mongoUrl = require('../../../main/mongo/mongo-url')

describe('unit tests of mongo-url', function () {
  it('should work', function () {
    expect(mongoUrl()).to.equal('mongodb://localhost:39120/mongotest-local')

    expect(mongoUrl({ protocol: 'mongodb+srv://' })).to.equal('mongodb+srv://localhost/mongotest-local')

    expect(mongoUrl({
      protocol: 'mongodb://',
      host: 'foo',
      port: 1,
      dbName: 'bar'
    })).to.equal('mongodb://foo:1/bar')

    expect(mongoUrl({
      protocol: 'mongodb+srv://',
      host: 'foo',
      port: 1,
      dbName: 'bar'
    })).to.equal('mongodb+srv://foo/bar')
  })
})
