'use strict'

const cp = require('child_process')
const pause = millis => new Promise(resolve => setTimeout(resolve, millis))

module.exports = async (args, pauseMillis = 2000) => {
  console.log(cp.execFileSync(`${__dirname}/start-mongo.sh`, args).toString())
  await pause(pauseMillis)
}
