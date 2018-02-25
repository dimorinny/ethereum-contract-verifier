import util from 'util';
import fs from 'fs';

export async function readFileAsync(path) {
    const readFile = util.promisify(fs.readFile);
    return await readFile(path, 'utf-8');
}
