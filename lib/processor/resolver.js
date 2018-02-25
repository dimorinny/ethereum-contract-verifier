import { CompositeByteCodeProcessor } from './composite'
import { SwarmMetadataStripper } from './swarm'

export function resolveProcessor (solcVersion) {
  const compositeProcessor = CompositeByteCodeProcessor()

  addVersionSpecificProcessors(solcVersion, compositeProcessor)

  return compositeProcessor
}

const COMPILER_WITH_SWARM_METADATA_VERSION = 47

function addVersionSpecificProcessors (solcVersion, compositeProcessor) {

  if (solcVersion.toNumber() >= COMPILER_WITH_SWARM_METADATA_VERSION) {
    compositeProcessor.add(
      SwarmMetadataStripper()
    )
  }
}
