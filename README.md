# `mongo-test-support`

Handy-dandy Mongo integration testing utility that starts a local Docker container running Mongo if you're not running in a CI/CD pipeline.
This allows you to run integration tests locally in a manner similar to how they'd be run in the CI/CD pipeline. 
This module does nothing when running in a CI build pipeline, because Mongo should be configured as part of the build via something like [`.gitlab-ci.yml`'s `services`](https://docs.gitlab.com/ee/ci/yaml/#services) element.

This package is intended to be installed in your project in `devDependencies`.

Your application must install its desired versions of [`mongodb`](https://www.npmjs.com/package/mongodb) and/or [mongoose](https://www.npmjs.com/package/mongoose).

> NOTE: requires a Unix-y shell (`/usr/bin/env sh`) to be available.
>This is not designed to run on Windows; PRs/MRs welcome.

Usage:
```javascript
const { mongoConnect } = require('@northscaler/mongo-test-support')

const db = await mongoConnect()

// now you can do db.createCollection(), etc
// db.client is mongo client
```

Usage to work in both local environment & CI pipeline:
```javascript
const { mongoConnect } = require('@northscaler/mongo-test-support')
const db = await mongoConnect(process.env.CI_COMMIT_SHA ? { host: 'mongo', port: 27017 } : undefined)
```

You can also drop collections:
```javascript
const { dropCollections } = require('@northscaler/mongo-test-support')
await dropCollections({db}) // drops all collections
await dropCollections({db, names: ['foos', 'bars']}) // drops named collections
await dropCollections({db, names: []}) // no collections dropped
```

## Configuration

The default configuration is pretty conventional, with the sole exception of the default port that Mongo will listen on for clients.
Instead of `27017`, which might already be in use on developers' machines when they run integration tests, the default configuration uses `37017`.
It is a `TODO` to search for an available port.

>NOTE: This module detects when it's running in a CI/CD pipeline by seeing if the environment variable `CI_COMMIT_SHA` or `GITHUB_SHA` is of nonzero length.

### Environment variables

The following environment variables can be set to configure the docker container:
* MONGO_TEST_SUPPORT_TAG: The tag of the [`mongo` Docker image](https://hub.docker.com/_/mongo)  or custom image to use, default `latest`
* MONGO_TEST_SUPPORT_PORT: visible client port on `localhost` to map to container port, default is content of `mongo/default-mongo-test-port`
* MONGO_TEST_SUPPORT_CONTAINER: name of container, default is content of file `mongo/default-mongo-test-container`
* MONGO_TEST_SUPPORT_CONTAINER_PORT: mongo client port in container, default `9042`
* MONGO_TEST_SUPPORT_IMAGE: docker image name, default `mongo`
