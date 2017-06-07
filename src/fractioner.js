module.exports = class Fractioner {
  static get FRACTIONS() {
    return [
      { fraction: '1/64', precision: 64, value: 0.015625 },
      { fraction: '1/32', precision: 32, value: 0.03125 },
      { fraction: '3/64', precision: 64, value: 0.046875 },
      { fraction: '1/16', precision: 16, value: 0.0625 },
      { fraction: '5/64', precision: 64, value: 0.078125 },
      { fraction: '3/32', precision: 32, value: 0.09375 },
      { fraction: '7/64', precision: 64, value: 0.109375 },
      { fraction: '1/8', precision: 8, value: 0.125 },
      { fraction: '9/64', precision: 64, value: 0.140625 },
      { fraction: '5/32', precision: 32, value: 0.15625 },
      { fraction: '11/64', precision: 64, value: 0.171875 },
      { fraction: '3/16', precision: 16, value: 0.1875 },
      { fraction: '13/64', precision: 64, value: 0.203125 },
      { fraction: '7/32', precision: 32, value: 0.21875 },
      { fraction: '15/64', precision: 64, value: 0.234375 },
      { fraction: '1/4', precision: 4, value: 0.25 },
      { fraction: '17/64', precision: 64, value: 0.265625 },
      { fraction: '9/32', precision: 32, value: 0.28125 },
      { fraction: '19/64', precision: 64, value: 0.296875 },
      { fraction: '5/16', precision: 16, value: 0.3125 },
      { fraction: '21/64', precision: 64, value: 0.328125 },
      { fraction: '11/32', precision: 32, value: 0.34375 },
      { fraction: '23/64', precision: 64, value: 0.359375 },
      { fraction: '3/8', precision: 8, value: 0.375 },
      { fraction: '25/64', precision: 64, value: 0.390625 },
      { fraction: '13/32', precision: 32, value: 0.40625 },
      { fraction: '27/64', precision: 64, value: 0.421875 },
      { fraction: '7/16', precision: 16, value: 0.4375 },
      { fraction: '29/64', precision: 64, value: 0.453125 },
      { fraction: '15/32', precision: 32, value: 0.46875 },
      { fraction: '31/64', precision: 64, value: 0.484375 },
      { fraction: '1/2', precision: 2, value: 0.5 },
      { fraction: '17/32', precision: 32, value: 0.53125 },
      { fraction: '9/16', precision: 16, value: 0.5625 },
      { fraction: '19/32', precision: 32, value: 0.59375 },
      { fraction: '5/8', precision: 8, value: 0.625 },
      { fraction: '21/32', precision: 32, value: 0.65625 },
      { fraction: '11/16', precision: 16, value: 0.6875 },
      { fraction: '23/32', precision: 32, value: 0.71875 },
      { fraction: '3/4', precision: 4, value: 0.75 },
      { fraction: '25/32', precision: 32, value: 0.78125 },
      { fraction: '13/16', precision: 16, value: 0.8125 },
      { fraction: '27/32', precision: 32, value: 0.84375 },
      { fraction: '7/8', precision: 8, value: 0.875 },
      { fraction: '29/32', precision: 32, value: 0.90625 },
      { fraction: '15/16', precision: 16, value: 0.9375 },
      { fraction: '31/32', precision: 32, value: 0.96875 }
    ]
  }

  static parse(fraction) {
    fraction = fraction.trim()
    const parts = fraction.split('/')

    if (parts.length !== 2) {
      throw new Error(`Measures::Fractioner ${fraction} is not a valid fraction.`)
    }

    const result = Fractioner.parseNumber(parts[0]) / Fractioner.parseNumber(parts[1])

    if (isNaN(result)) {
      throw new Error(`Measures::Fractioner could not parse ${fraction} into a number.`)
    }

    return result
  }

  static parseNumber(number) {
    number = number.replace(/[^\d\.]/gi, '')
    return parseFloat(number, 10)
  }

  static closest(value, precision) {
    value = parseFloat(value, 10)

    if (!value || value >= 1) {
      throw new Error(`
        Measures::Fractioner::closest() expect a value that is exclusively
        between 0 and 1 as an argument.
      `)
    }


    let fractions = Fractioner.FRACTIONS

    if (precision) {
      const validPrecisions = [2, 4, 8, 16, 32, 64]
      if (validPrecisions.indexOf(precision) < 0) {
        throw new Error(`
          Measures::Fractioner::closest() precision must be in ${validPrecisions}.
        `)
      }

      fractions = fractions.filter(f => f.precision <= precision)
    }

    let topMatch
    let bottomMatch
    let previousFraction

    fractions.forEach(f => {
      if (!topMatch && f.value >= value) {
        topMatch = f
        bottomMatch = previousFraction
      }
      previousFraction = f
    })

    if (
      bottomMatch &&
      Math.abs(bottomMatch.value - value) < Math.abs(topMatch.value - value)
    ) {
      return bottomMatch
    }
    else {
      return topMatch
    }
  }
}
