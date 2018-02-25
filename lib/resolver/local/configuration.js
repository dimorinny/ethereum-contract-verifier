const path = require('path')
const yaml = require('js-yaml')
const {readFileAsync} = require('../../util/file')

class ContractData {
  constructor (contractName, entrypoint, contractAddress, network, sources, compiler, optimized) {
    this.contractName = contractName
    this.entrypoint = entrypoint
    this.contractAddress = contractAddress
    this.network = network
    this.sources = sources
    this.compiler = compiler
    this.optimized = optimized
  }
}

ContractData.load = async function (contractPath) {
  const sources = path.join(contractPath, 'src')
  const content = await readFileAsync(path.join(contractPath, 'contract.yaml'))
  const configuration = yaml.safeLoad(content)

  // TODO dimorinny: verify by json schema

  return new ContractData(
    configuration['contract-name'],
    configuration['entrypoint'],
    configuration['contract-address'],
    configuration['network'],
    sources,
    configuration['compiler'],
    configuration['optimized'] === 'true'
  )
}

module.exports = {
  ContractData
}
