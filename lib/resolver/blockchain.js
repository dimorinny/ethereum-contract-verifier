import Web3 from 'web3'

export class BlockChainByteCodeResolver {

  static MAIN_NET = 'mainnet'
  static ROPSTEN = 'ropsten'
  static KOVAN = 'kovan'
  static RINKEBY = 'rinkeby'

  constructor (network) {
    this.provider = new Web3(
      new Web3.providers.HttpProvider(
        resolveProviderUrl(network)
      )
    )
  }

  async resolve (address) {
    const byteCode = await this.provider.eth.getCode(address)
    return byteCode
      .trim()
      .replace(/^0x/, '')
  }
}

const providers = {
  'mainnet': 'https://mainnet.infura.io/',
  'ropsten': 'https://ropsten.infura.io/',
  'kovan': 'https://kovan.infura.io/',
  'rinkeby': 'https://rinkeby.infura.io/'
}

function resolveProviderUrl (provider) {
  return providers[provider]
}
