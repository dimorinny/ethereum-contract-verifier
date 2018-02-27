const {verify} = require('./verify')

async function main () {
  const result = await verify('example/0.4.6-optimized')
  console.log(`Matched: ${result}`)
}

main()
