const {loadSolcCompiler} = require('../../util/solc')
const {generateCompilationInput} = require('./input')

class LocalByteCodeResolver {
  constructor (configuration) {
    this.data = configuration
  }

  async resolve () {
    const compiler = await loadSolcCompiler(this.data.compiler.full)
    const compilationInput = await generateCompilationInput(this.data)

    const compilationResult = compiler.compileStandardWrapper(
      compilationInput,
      this.data.optimized
    )

    const contracts = JSON.parse(compilationResult).contracts['']
    const contract = contracts[this.data.contractName]

    if (contract === undefined) {
      throw new Error(`Contract with name: ${this.data.contractName} not found in compilation result.}`)
    }

    const abi = JSON.stringify(contract.abi)
    const byteCode = contract.evm.deployedBytecode.object.trim()

    return new CompilationResult(
      byteCode,
      abi
    )
  }
}

class CompilationResult {
  constructor (bytecode, abi) {
    this.bytecode = bytecode
    this.abi = abi
  }
}

module.exports = {
  LocalByteCodeResolver
}
