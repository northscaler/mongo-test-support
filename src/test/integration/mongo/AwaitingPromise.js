'use strict'

// from https://gist.github.com/matthewadams/f6a87e41abe429ae76ec539a039fe07c:

/**
 * Function that returns a `Promise` that `await`s an `async` function's completion.
 *
 * @param {Object} [arg={}] The argument to be destructured.
 * @param {function} [arg.asyncFn=AwaitingPromise.DEFAULT_FN] An `async` function whose completion is to be `await`ed.
 * Defaults to a no-op function.
 * @param {boolean} [arg.positive=true] If truey, the returned `Promise` will resolve if `asyncFn` does not throw, and will reject with the error that `asyncFn` throws.
 * If falsey, the returned `Promise` will reject with parameter `err`'s value if `asyncFn` does not throw, and will resolve with the error that `asyncFn` throws.
 * @param {any} [arg.err=AwaitingPromise.DEFAULT_ERROR] The error thrown if parameter `positive` is false and `asyncFn` does not throw as expected.
 * Defaults to a simple `Error` stating that the invocation of parameter `asyncFn` should have thrown.
 * @return {Promise<any>} Returns a `Promise` that resolves or rejects according to parameter `positive`:
 * * If `positive` is truey and `asyncFn` returns normally, the `Promise` resolves with `asyncFn`'s return value.
 * * If `positive` is truey and `asyncFn` throws `e`, the `Promise` rejects with `e`.
 * * If `positive` is falsey and `asyncFn` returns normally, the `Promise` rejects with the value of the parameter `err`.
 * * If `positive` is falsey and `asyncFn` throws `e`, the `Promise` resolves with `e`.
 */
const AwaitingPromise = ({
  asyncFn = AwaitingPromise.DEFAULT_FN,
  positive = true,
  err = AwaitingPromise.DEFAULT_ERROR
} = {}) =>
  new Promise((resolve, reject) => {
    const f = async () => {
      try {
        const value = await asyncFn()
        if (positive) resolve(value)
        else reject(err)
      } catch (e) {
        if (positive) reject(e)
        else resolve(e)
      }
    }

    return f()
  })
AwaitingPromise.DEFAULT_FN = () => {}
AwaitingPromise.DEFAULT_ERROR = new Error('asyncFn should have thrown')

module.exports = AwaitingPromise
