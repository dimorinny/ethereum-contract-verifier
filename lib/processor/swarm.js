/**
 * Processor for byte code compiled by solc 0.4.6 or higher.
 * After this version solc compiler started to adding swarm metadata to bytecode.
 * We should remove it before comparing, because this data specific for
 * local compilation environment.
 */
export class SwarmMetadataStripper {

    process(byteCode) {
        return byteCode;
    }
}