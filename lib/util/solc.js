import util from 'util';
import solc from 'solc';

export async function loadSolcCompiler(version) {
    const loadCompiler = util.promisify(solc.loadRemoteVersion);
    return await loadCompiler(version);
}