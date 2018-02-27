const assert = require('assert')
const {verify} = require('../lib/verify')

describe('verify method', async () => {

  it('should returns true for 0.2.1-optimized folder', async () => {
    assert.equal(
      await verify('example/0.2.1-optimized'),
      true
    )
  })

  it('should returns true for 0.3.0-optimized folder', async () => {
    assert.equal(
      await verify('example/0.3.0-optimized'),
      true
    )
  })

  it('should returns true for 0.4.2-optimized folder', async () => {
    assert.equal(
      await verify('example/0.4.2-optimized'),
      true
    )
  })

  it('should returns true for 0.4.4-without-optimizations folder', async () => {
    assert.equal(
      await verify('example/0.4.4-without-optimizations'),
      true
    )
  })

  it('should returns true for 0.4.6-optimized folder', async () => {
    assert.equal(
      await verify('example/0.4.6-optimized'),
      true
    )
  })

  // TODO dimorinny: fix
  // it('should returns true for 0.4.20-optimized folder', async () => {
  //   assert.equal(
  //     await verify('example/0.4.20-optimized'),
  //     true
  //   )
  // })
})
