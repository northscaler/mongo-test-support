'use strict'

const cp = require('child_process')
const pause = millis => new Promise(resolve => setTimeout(resolve, millis))

module.exports = async (args, pauseMillis = 2000) => {
  cp.execFileSync(`${__dirname}/start-mongo.sh`, args)
  await pause(pauseMillis)
}
