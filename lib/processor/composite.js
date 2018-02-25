/**
 * Combine multiple byte code processors.
 */
class CompositeByteCodeProcessor {
  constructor (processors) {
    this.processors = processors
  }

  add (processor) {
    this.processors.add(processor)
  }

  process (byteCode) {
    return this.processors.reduce((code, processor) => processor.process(code), byteCode)
  }
}

module.exports = {
  CompositeByteCodeProcessor
}
