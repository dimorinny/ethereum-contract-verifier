const path = require('path')
const {readFileAsync} = require('../../util/file')

async function generateCompilationInput (configuration) {
  const entrypoint = path.join(configuration.sources, configuration.entrypoint)
  const entrypointSources = await readFileAsync(entrypoint)

  return JSON.stringify({
    language: 'Solidity',
    sources: {
      [configuration.contractName]: {
        content: entrypointSources
      }
    },
    settings: {
      ...optimizationRuns(configuration),
      outputSelection: {
        [configuration.contractName]: {
          '*': ['evm.deployedBytecode', 'abi']
        }
      }
    }
  })
}

function optimizationRuns (configuration) {
  if (configuration.optimizationRuns) {
    return {
      optimizer: {
        enabled: true,
        runs: configuration.optimizationRuns
      }
    }
  }
}

module.exports = {
  generateCompilationInput
}
