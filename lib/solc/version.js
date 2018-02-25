export class Version {

  constructor (major, minor) {
    this.major = major
    this.minor = minor
  }

  toView () {
    return '0.' + this.major + '.' + this.minor
  }

  toNumber () {
    return this.major * 10 + this.minor
  }
}
