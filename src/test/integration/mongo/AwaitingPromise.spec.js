/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const AwaitingPromise = require('./AwaitingPromise')

describe('AwaitingPromise', function () {
  it('should work with no arguments', async function () {
    const value = await AwaitingPromise()
    expect(value).to.be.undefined()
  })
  it('should work on the positive happy path', async function () {
    const v = 'value'
    const value = await AwaitingPromise({ asyncFn: async () => v })
    expect(value).to.equal(v)
  })
  it('should work on the negative happy path', async function () {
    try {
      await AwaitingPromise({ asyncFn: async () => {}, positive: false })
    } catch (err) {
      expect(err).to.equal(AwaitingPromise.DEFAULT_ERROR)
    }
  })
  it('should work on the positive saddy path', async function () {
    const e = new Error()
    try {
      await AwaitingPromise({ asyncFn: async () => { throw e } })
    } catch (err) {
      expect(err).to.equal(e)
    }
  })
  it('should work on the negative saddy path', async function () {
    try {
      await AwaitingPromise({ asyncFn: async () => {}, positive: false })
    } catch (err) {
      expect(err).to.equal(AwaitingPromise.DEFAULT_ERROR)
    }
  })
})
