const Fractioner = require('./fractioner.js')
const Parser = require('./parser.js')

module.exports = class Converter {
  static get CONVERSIONS() {
    return {
      millimeter: {
        millimeter: 1,
        centimeter: .1,
        meter: .001,
        kilometer: .000001,
        inch: .039370078740157	,
        foot: .0032808398950131,
        yard: .0010936132983377,
        mile: .00000062137119223733
      },
      centimeter: {
        millimeter: 10,
        centimeter: 1,
        meter: .01,
        kilometer: .00001,
        inch: .39370078740157,
        foot: .032808398950131,
        yard: .010936132983377,
        mile: .0000062137119223733
      },
      meter: {
        millimeter: 1000,
        centimeter: 100,
        meter: 1,
        kilometer: .001,
        inch: 39.370078740157,
        foot: 3.2808398950131,
        yard: 1.0936132983377,
        mile: .00062137119223733
      },
      kilometer: {
        millimeter: 1000000,
        centimeter: 100000,
        meter: 1000,
        kilometer: 1,
        inch: 39370.078740157,
        foot: 3280.8398950131,
        yard: 1093.6132983377,
        mile: .62137119223733
      },
      inch: {
        millimeter: 25.4,
        centimeter: 2.54,
        meter: 0.0254,
        kilometer: 0.0000254,
        inch: 1,
        foot: 0.083333333333333,
        yard: 0.027777777777778,
        mile: 0.000015782828282828
      },
      foot: {
        millimeter: 304.8,
        centimeter: 30.48,
        meter: 0.3048,
        kilometer: 0.0003048,
        inch: 12,
        foot: 1,
        yard: 0.33333333333333,
        mile: 0.00018939393939394
      },
      yard: {
        millimeter: 914.4,
        centimeter: 91.44,
        meter: 0.9144,
        kilometer: 0.0009144,
        inch: 36,
        foot: 3,
        yard: 1,
        mile: 0.00056818181818182
      },
      mile: {
        millimeter: 1609344,
        centimeter: 160934.4,
        meter: 1609.344,
        kilometer: 1.609344,
        inch: 63360,
        foot: 5280,
        yard: 1760,
        mile: 1
      }
    }
  }

  static _convert(value, fromUnit, toUnit) {
    if (typeof fromUnit === 'string') {
      fromUnit = Parser.getUnitByLabel(fromUnit)
    }

    if (typeof toUnit === 'string') {
      toUnit = Parser.getUnitByLabel(toUnit)
    }

    return value * Converter.CONVERSIONS[fromUnit.name][toUnit.name]
  }

  constructor(segments) {
    if (!Array.isArray(segments)) {
      throw new Error(`
        Lengthy::Converter constructor() expect an array of segments as an argument.
        Received ${segments}
      `)
    }

    this.segments = segments
  }

  sum(unitName) {
    let unit

    if (typeof unitName !== 'string') {
      unit = unitName
    }
    else {
      unit = Parser.getUnitByLabel(unitName)
    }

    if (!unit) {
      throw new Error(`
        Lengthy::Converter cannot sum() with the unit ${unitName}
      `)
    }

    let total = 0
    this.segments.forEach(segment => {
      total += Converter._convert(segment.value, segment.unit.name, unit.name)
    })
    return total
  }

  convert(units) {
    if (!Array.isArray(units)) {
      units = [units]
    }

    let currentUnitName = units[0].split('-')[0]
    let value = this.sum(currentUnitName)
    let result = []

    for (let index in units) {
      const parts = units[index].split('-')
      const unitName = parts[0]
      const precision = parts[1]
      const unit = Parser.getUnitByLabel(unitName)
      const segment = { unit }
      const lastUnit = units.length === parseInt(index, 10) + 1
      let remainder = 0

      if (!unit) {
        throw new Error(`Lengthy::Converter cannot convert to unknown unit ${unitName}`)
      }

      if (unitName !== currentUnitName) {
        value = Converter._convert(value, currentUnitName, unitName)
      }

      if (!lastUnit) {
        segment.value = Math.floor(value)
        remainder = value - segment.value
      }
      else {
        segment.value = value
        remainder = 0
      }

      if (precision) {
        segment.precision = precision
        if (precision.charAt('0') === '/') {
          segment.isFractional = true
          segment.precision = precision.substring(1)

          const integerPart = Math.floor(segment.value)
          const decimalPart = segment.value - integerPart
          const parts = []

          if (integerPart) {
            parts.push(integerPart)
          }
          if (decimalPart) {
            parts.push(Fractioner.closest(decimalPart).fraction)
            remainder = 0
          }
          segment.formattedValue = parts.join(' ')
        }
        else if (precision === 'round') {
          segment.formattedValue = Math.round(segment.value)
        }
        else if (precision === 'floor' || precision === '0') {
          segment.formattedValue = Math.floor(segment.value)
        }
        else if (precision === 'ceil') {
          segment.formattedValue = Math.ceil(segment.value)
        }
        else {
          segment.formattedValue = segment.value.toPrecision(precision)
        }
      }
      else {
        segment.formattedValue = segment.value
      }
      segment.formattedValue += unit.label

      result.push(segment)

      currentUnitName = unitName
      value = remainder
    }

    return result
  }
}
