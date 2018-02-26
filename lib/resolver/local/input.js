const path = require('path')
const {readFileAsync} = require('../../util/file')

async function generateCompilationInput(configuration) {
  const entrypoint = path.join(configuration.sources, configuration.entrypoint)
  const entrypointSources = await readFileAsync(entrypoint)

  // TODO dimorinny: apply optimizer from configuration

  return JSON.stringify({
    language: 'Solidity',
    sources: {
      [configuration.contractName]: {
        content: entrypointSources
      }
    },
    settings: {
      optimizer: {
        enabled: false,
        runs: 0
      }
    }
  })
}

module.exports = {
  generateCompilationInput
}
