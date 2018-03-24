#!/usr/bin/env node

const {verify} = require('./lib/verify')
const packageJson = require('./package.json')
const program = require('commander')

const verifyCommandHelp = `

Match local contract with deployed to ethereum network.
Passed directory should contains contract.yaml file, that has metadata for verifying contract:

1. contract-name - Entrypoint contract name,                             Required: true,  Example: ERC20Token
2. entrypoint - Entrypoint solidity file (that has entrypoint contract), Required: true,  Example: ERC20Token.sol
3. contract-address - Deployed contract address,                         Required: true,  Example: 0x0b1225323ff8dafee69643068bedbb0e351b8271
4. network - Ethereum network, where contract was deployed,              Required: true,  Example: mainnet
5. compiler - Ethereum compiler version,                                 Required: true,  Example: v0.4.20+commit.3155dd80 (or another from there https://github.com/ethereum/solc-bin/tree/gh-pages/bin)
6. optimization-runs - Count of compilation optimization runs,           Required: false, Example: 200 (from 0 to 200)
`

function verifyCommand (directory, command) {
  verify(directory)
    .then(result => {
      const matched = result.localByteCode === result.remoteByteCode

      console.log(`Local: ${result.localByteCode}`)
      console.log()
      console.log(`Remote: ${result.remoteByteCode}`)

      console.log()
      console.log(`Abi: ${result.abi}`)
      console.log()
      console.log(`Matched: ${matched}`)

      if (matched) {
        process.exit(0)
      } else {
        process.exit(1)
      }
    })
    .catch(e => {
      console.error(e)
      process.exit(1)
    })
}

program
  .version(packageJson.version)
  .command('verify <directory>')
  .description(verifyCommandHelp)
  .action(verifyCommand)

program.parse(process.argv)
