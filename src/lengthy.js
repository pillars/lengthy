const Parser = require('./parser')
const Converter = require('./converter')

module.exports = class Measures {
  from(string) {
    this.segments = new Parser().parse(string)
    return this
  }

  to(units) {
    const segments = new Converter(this.segments).convert(units)
    return segments.map(s => s.formattedValue).join(' ')
  }
}
