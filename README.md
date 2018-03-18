[![Build Status](https://travis-ci.org/dimorinny/ethereum-contract-verifier.svg?branch=master)](https://travis-ci.org/dimorinny/ethereum-contract-verifier)

```
Usage: ethereum-contract-verifier [options] [command]

Options:

-V, --version       output the version number
-h, --help          output usage information

Commands:

verify <directory>  

Match local contract with deployed to ethereum network.
Passed directory should contains contract.yaml file, that has metadata for verifying contract:

1. contract-name - Entrypoint contract name,                             Required: true,  Example: ERC20Token
2. entrypoint - Entrypoint solidity file (that has entrypoint contract), Required: true,  Example: ERC20Token.sol
3. contract-address - Deployed contract address,                         Required: true,  Example: 0x0b1225323ff8dafee69643068bedbb0e351b8271
4. network - Ethereum network, where contract was deployed,              Required: true,  Example: mainnet
5. compiler - Ethereum compiler version,                                 Required: true,  Example: v0.4.20+commit.3155dd80 (or another from there https://github.com/ethereum/solc-bin/tree/gh-pages/bin)
6. optimization-runs - Count of compilation optimization runs,           Required: false, Example: 200 (from 0 to 200)

```

```
docker run \
    -v $(pwd)/example:/example \
    dimorinny/ethereum-contract-verifier:latest \
    ethereum-contract-verifier verify /example/0.4.20-multiple-files
```

https://hub.docker.com/r/dimorinny/ethereum-contract-verifier/
