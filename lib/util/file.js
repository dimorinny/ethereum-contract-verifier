const util = require('util')
const path = require('path')
const fs = require('fs')

async function readFileAsync (path) {
  const readFile = util.promisify(fs.readFile)
  return readFile(path, 'utf8')
}

function readDirectory (directory, filter, baseDirectory = directory) {
  return _readDirectory(directory, baseDirectory).filter(item => item.match(filter))
}

function _readDirectory (directory, baseDirectory) {
  return fs.statSync(directory).isDirectory()
    ? Array.prototype.concat(...fs.readdirSync(directory)
      .map(file => _readDirectory(path.join(directory, file), baseDirectory)))
    : path.relative(baseDirectory, directory)
}

module.exports = {
  readFileAsync,
  readDirectory
}
