const test = require('tape')
const {verify} = require('../lib/verify')

const cases = [
  '0.2.1-optimized',
  '0.3.0-optimized',
  '0.4.2-optimized',
  '0.4.4-without-optimizations',
  '0.4.6-optimized',
  '0.4.20-optimized',
  '0.4.20-multiple-files',
  '0.4.20-multiple-files-with-back-import',
  '0.4.20-multiple-files-with-double-back-import',
  '0.4.20-multiple-files-with-back-import-on-second-level',
  '0.4.20-multiple-files-with-import-on-second-level'
]

test('verify method', async t => {

  cases.forEach(async folder => {
    t.test(`should returns true for ${folder} folder`, async (t) => {
      const result = await verify(`example/${folder}`)
      const matched = result.localByteCode === result.remoteByteCode

      console.log(`Local: ${result.localByteCode}`)
      console.log()
      console.log(`Remote: ${result.remoteByteCode}`)

      console.log()
      console.log(`Abi: ${result.abi}`)
      console.log()
      console.log(`Matched: ${matched}`)

      t.true(matched)
      t.end()
    })
  })

  t.end()
})
