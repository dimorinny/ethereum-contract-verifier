const {resolveProcessor} = require('./processor/resolver')
const {ContractData} = require('./resolver/local/configuration/configuration')
const {LocalByteCodeResolver} = require('./resolver/local/local')
const {BlockChainByteCodeResolver} = require('./resolver/blockchain')

async function verify (path) {
  const configuration = await ContractData.load(path)

  const localRemoteProcessor = resolveProcessor(configuration.compiler)

  const localResolver = new LocalByteCodeResolver(configuration)
  const remoteResolver = new BlockChainByteCodeResolver(configuration.network)

  const compilationResult = await localResolver.resolve()
  const abi = compilationResult.abi

  const localByteCode = compilationResult.bytecode
  const remoteByteCode = await remoteResolver.resolve(configuration.contractAddress)

  const processedLocal = localRemoteProcessor.process(localByteCode)
  const processedRemote = localRemoteProcessor.process(remoteByteCode)

  console.log(`Local: ${processedLocal}`)
  console.log()
  console.log(`Remote: ${processedRemote}`)

  console.log()
  console.log(`Abi: ${abi}`)
  console.log()

  return processedLocal === processedRemote
}

module.exports = {
  verify
}
