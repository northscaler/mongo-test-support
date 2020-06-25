'use strict'

const cp = require('child_process')
const pause = millis => new Promise(resolve => setTimeout(resolve, millis))

module.exports = async ({ scriptArgs, pauseMillis = 2000 }) => {
  console.log(cp.execFileSync(`${__dirname}/start-mongo.sh`, scriptArgs).toString())
  await pause(pauseMillis)
}
