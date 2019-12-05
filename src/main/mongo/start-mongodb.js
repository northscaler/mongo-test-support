'use strict'

const fs = require('fs')
const cp = require('child_process')
const pause = millis => new Promise(resolve => setTimeout(resolve, millis))
const name = fs.readFileSync(`${__dirname}/default-mongo-test-container`).toString().trim()

module.exports = async (args, pauseMillis = 2000) => {
  if (!cp.execSync(`docker ps --quiet --filter name=${name}`).toString()) {
    cp.execFileSync(`${__dirname}/start-mongodb.sh`, args)
    await pause(pauseMillis)
  }
}
