const {verify} = require('./verify')

async function main () {
  const result = await verify('example/0.4.20-back-import-on-second-level')
  console.log(`Matched: ${result}`)
}

main()
