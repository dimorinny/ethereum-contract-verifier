/**
 * Combine multiple byte code processors.
 */
export class CompositeByteCodeProcessor {

  constructor (processors) {
    this.processors = processors
  }

  add (processor) {
    this.processors.add(processor)
  }

  process (byteCode) {
    let processedByteCode = byteCode

    this.processors.forEach((processor) => {
      processedByteCode = processor.process(processedByteCode)
    })

    return processedByteCode
  }
}
