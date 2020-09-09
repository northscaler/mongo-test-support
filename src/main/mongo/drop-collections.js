'use strict'

/**
 * Uses the given db to drop the indicated collections or all collections.
 *
 * @param {object} arg0 The argument to be deconstructed.
 * @param {object} arg0.db The db in which to drop collections.
 * @param {string|string[]|null|undefined} [arg0.names] If not given, all collections are dropped, else the given collections are dropped.
 * @return {Promise<void>}
 */
async function dropCollections ({ db, names }) {
  names = typeof names === 'string' ? [names] : names

  let collections = (await db.collections()).map(it => it.collectionName)
  collections = collections.filter(collection => !names || names.findIndex(it => it === collection) !== -1)
  for (const collection of collections) {
    await db.dropCollection(collection)
  }
}

module.exports = dropCollections
