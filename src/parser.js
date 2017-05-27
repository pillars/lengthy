const Fractioner = require('./fractioner')

module.exports = class Parser {
  static get METER() { return 'meter' }
  static get KILOMETER() { return 'kilometer' }
  static get CENTIMETER() { return 'centimeter' }
  static get MILLIMETER() { return 'millimeter' }
  static get FOOT() { return 'foot' }
  static get INCH() { return 'inch' }
  static get MILE() { return 'mile' }
  static get YARD() { return 'yard' }
  static get validUnits() {
    return [
      Parser.METER,
      Parser.KILOMETER,
      Parser.CENTIMETER,
      Parser.MILLIMETER,
      Parser.FOOT,
      Parser.INCH,
      Parser.MILE,
      Parser.YARD
    ]
  }

  static get UNITS() {
    return [
      {
        label: 'm',
        name: Parser.METER
      },
      {
        label: 'meter',
        name: Parser.METER
      },
      {
        label: 'meters',
        name: Parser.METER
      },
      {
        label: 'km',
        name: Parser.KILOMETER
      },
      {
        label: 'kilometer',
        name: Parser.KILOMETER
      },
      {
        label: 'kilometers',
        name: Parser.KILOMETER
      },
      {
        label: 'cm',
        name: Parser.CENTIMETER
      },
      {
        label: 'centimeter',
        name: Parser.CENTIMETER
      },
      {
        label: 'centimeters',
        name: Parser.CENTIMETER
      },
      {
        label: 'mm',
        name: Parser.MILLIMETER
      },
      {
        label: 'millimeter',
        name: Parser.MILLIMETER
      },
      {
        label: 'millimeters',
        name: Parser.MILLIMETER
      },
      {
        label: '\'',
        name: Parser.FOOT
      },
      {
        label: 'ft',
        name: Parser.FOOT
      },
      {
        label: 'foot',
        name: Parser.FOOT
      },
      {
        label: 'feet',
        name: Parser.FOOT
      },
      {
        label: '"',
        name: Parser.INCH
      },
      {
        label: 'in',
        name: Parser.INCH
      },
      {
        label: 'inch',
        name: Parser.INCH
      },
      {
        label: 'inches',
        name: Parser.INCH
      },
      {
        label: 'mi',
        name: Parser.MILE
      },
      {
        label: 'mile',
        name: Parser.MILE
      },
      {
        label: 'miles',
        name: Parser.MILE
      },
      {
        label: 'yd',
        name: Parser.YARD
      },
      {
        label: 'yard',
        name: Parser.YARD
      },
      {
        label: 'yards',
        name: Parser.YARD
      },
    ]
  }

  static getUnitByLabel(label) {
    return Parser.UNITS.find(u => u.label === label)
  }

  constructor() {
    this.segments = []
  }

  parse(string) {
    if (!string) {
      throw new Error(`
        Lengthy::Parser constructor() expect a string as an argument.
        Received ${string}
      `)
    }

    this.string = this._normalize(string)
    let result
    let segment
    let unit
    let value = 0

    // captures segment with the unit at the end: 4cm, 10 km, 4 1/2"
    const unitRegex = /([\d\s\.]+)?(?:\s*(\d+\/\d+))?\s*([^\d\s\/]+)$/
    result = unitRegex.exec(string)
    if (result) {
      segment = result[0]
      unit = Parser.UNITS.find(u => u.label === result[3])
      value += this._parseNumber(result[1])
      value += this._parseNumber(result[2])
    }
    else {
      // captures segment with unit in the middle: 4in 1/2
      const fractionRegex = /([\d\s]+)\s*([^\d\s]+)\s+(\d+\/\d+)$/
      result = fractionRegex.exec(string)
      if (result) {
        segment = result[0]
        unit = Parser.UNITS.find(u => u.label === result[2])
        value = this._parseNumber(result[1])
        value += this._parseNumber(result[3])
      }
    }

    if (!unit) {
      throw new Error(`
        Lengthy::Parser could not guess unit of ${string}.
        Please pass the unit explicitly via the "unit" option.
      `)
    }

    this.segments.push({
      formattedValue: this._normalize(segment.replace(unit.label, '')),
      isFractional: segment.indexOf('/') > -1,
      segment: this._normalize(segment),
      unit,
      value
    })
    string = string.replace(segment, '')

    if (string) {
      return this.parse(string)
    }
    else {
      return this.segments
    }
  }

  _parseNumber(number) {
    if (!number || !String(number).trim()) {
      return 0
    }
    const isFractional = number.indexOf('/') > -1
    let value

    if (isFractional) {
      value = Fractioner.parse(number)
    }
    else if (number) {
      value = Fractioner.parseNumber(number)
    }

    if (isNaN(value)) {
      throw new Error(`
        Lengthy::Parser could not parse value of ${number}.
        Please pass the unit explicitly via the "unit" option.
      `)
    }

    return value
  }

  _normalize(string) {
    return String(string).trim().toLowerCase().replace(/ +/g, ' ')
  }
}
