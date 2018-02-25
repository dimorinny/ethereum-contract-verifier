import yaml from 'js-yaml';
import path from 'path';
import {readFileAsync} from '../../util/file';

export class ContractData {

    constructor(contractName, entrypoint, contractAddress, network, sources, compiler, optimized) {
        this.contractName = contractName;
        this.entrypoint = entrypoint;
        this.contractAddress = contractAddress;
        this.network = network;
        this.sources = sources;
        this.compiler = compiler;
        this.optimized = optimized;
    }

    static async load(contractPath) {
        const sources = path.join(contractPath, 'src');
        const configuration = yaml.safeLoad(
            await readFileAsync(path.join(contractPath, 'contract.yaml'))
        );

        // TODO dimorinny: verify by json schema

        return new ContractData(
            configuration['contract-name'],
            configuration['entrypoint'],
            configuration['contract-address'],
            configuration['network'],
            sources,
            configuration['compiler'],
            configuration['optimized'] === 'true'
        );
    }
}

