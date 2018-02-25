import path from 'path';
import {loadSolcCompiler} from '../../util/solc';
import {readFileAsync} from '../../util/file';

export class LocalByteCodeResolver {

    constructor(configuration) {
        this.data = configuration;
    }

    async resolve() {
        const compiler = await loadSolcCompiler(this.data.compiler);
        const entrypoint = path.join(this.data.sources, this.data.entrypoint);

        const entrypointSources = await readFileAsync(entrypoint);

        const compilationResult = compiler.compile(
            entrypointSources,
            this.data.optimized
        );

        const contracts = compilationResult['contracts'];

        if (
            !(this.data.contractName in contracts)
        ) {
            throw new Error('Contract with name: ' +
                this.data.contractName + ' not found in compilation result. Result: ' +
                compilationResult
            );
        }

        return new CompilationResult(
            contracts[this.data.contractName]['runtimeBytecode'].trim(),
            contracts[this.data.contractName]['interface'].trim()
        );
    }
}

class CompilationResult {

    constructor(bytecode, abi) {
        this.bytecode = bytecode;
        this.abi = abi;
    }
}
