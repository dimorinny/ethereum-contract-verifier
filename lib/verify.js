import {ContractData} from './resolver/local/configuration';
import {LocalByteCodeResolver} from './resolver/local/local';
import {BlockChainByteCodeResolver} from './resolver/blockchain';

export async function verify(path) {
    const configuration = await ContractData.load(path);

    const localResolver = new LocalByteCodeResolver(configuration);
    const remoteResolver = new BlockChainByteCodeResolver(configuration.network);

    const compilationResult = await localResolver.resolve();
    const abi = compilationResult.abi;

    const localByteCode = compilationResult.bytecode;
    const remoteByteCode = await remoteResolver.resolve(configuration.contractAddress);

    // TODO dimorinny: preprocessing bytecode before comparing

    console.log('Local: ' + localByteCode);
    console.log();
    console.log('Remote: ' + remoteByteCode);

    console.log();
    console.log('Abi: ' + abi);
    console.log();

    console.log('Matched: ' + (localByteCode === remoteByteCode));
}
