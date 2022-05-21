const path = require('path')

const SERVICE_WORKER_SOURCE_PATH = path.resolve(
  __dirname,
  '../',
  'node_modules/swap-sw/lib/esm',
  'swapSW.js',
)

const SERVICE_WORKER_BUILD_PATH = path.resolve(
  __dirname,
  '../',
  path.dirname(packageJson.module),
  path.basename(SERVICE_WORKER_SOURCE_PATH),
);

module.exports = {
  SERVICE_WORKER_SOURCE_PATH,
  SERVICE_WORKER_BUILD_PATH,
}
