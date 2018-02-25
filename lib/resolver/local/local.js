const path = require('path')
const { loadSolcCompiler } = require('../../util/solc')
const { readFileAsync } = require('../../util/file')

class LocalByteCodeResolver {
  constructor (configuration) {
    this.data = configuration
  }

  async resolve () {
    const compiler = await loadSolcCompiler(this.data.compiler)
    const entrypoint = path.join(this.data.sources, this.data.entrypoint)

    const entrypointSources = await readFileAsync(entrypoint)

    const compilationResult = compiler.compile(
      entrypointSources,
      this.data.optimized
    )

    const contracts = compilationResult['contracts']

    if (contracts[this.data.contractName] === undefined) {
      throw new Error(`Contract with name: ${this.data.contractName} not found in compilation result. Result: ${compilationResult}`)
    }

    return new CompilationResult(
      contracts[this.data.contractName]['runtimeBytecode'].trim(),
      contracts[this.data.contractName]['interface'].trim()
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
