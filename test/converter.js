const expect = require('chai').expect
const Parser = require('../src/parser.js')
const Converter = require('../src/converter.js')

describe('Converter', function () {
  this.timeout(30000)

  describe('convert()', function () {
    it('converts inches to meters', () => {
      const segments = new Parser().parse('3" 1/2')
      const result = new Converter(segments).convert('m')
      expect(result).to.deep.eq([
        {
          unit: Parser.getUnitByLabel('m'),
          formattedValue: '0.08889999999999999m',
          value: 0.08889999999999999
        }
      ])
    })

    it('supports a number precision', () => {
      const segments = new Parser().parse('3" 1/2')
      const result = new Converter(segments).convert('m-2')
      expect(result).to.deep.eq([
        {
          precision: '2',
          unit: Parser.getUnitByLabel('m'),
          formattedValue: '0.089m',
          value: 0.08889999999999999
        }
      ])
    })

    it('supports rounding', () => {
      const segments = new Parser().parse('6ft')
      const result = new Converter(segments).convert('m-round')
      expect(result).to.deep.eq([
        {
          precision: 'round',
          unit: Parser.getUnitByLabel('m'),
          formattedValue: '2m',
          value: 1.8288000000000002
        }
      ])
    })

    it('supports flooring', () => {
      const segments = new Parser().parse('6ft')
      const result = new Converter(segments).convert('m-floor')
      expect(result).to.deep.eq([
        {
          precision: 'floor',
          unit: Parser.getUnitByLabel('m'),
          formattedValue: '1m',
          value: 1.8288000000000002
        }
      ])
    })

    it('supports a precision of 0', () => {
      const segments = new Parser().parse('6ft')
      const result = new Converter(segments).convert('m-0')
      expect(result).to.deep.eq([
        {
          precision: '0',
          unit: Parser.getUnitByLabel('m'),
          formattedValue: '1m',
          value: 1.8288000000000002
        }
      ])
    })

    it('supports ceiling', () => {
      const segments = new Parser().parse('6ft')
      const result = new Converter(segments).convert('m-ceil')
      expect(result).to.deep.eq([
        {
          precision: 'ceil',
          unit: Parser.getUnitByLabel('m'),
          formattedValue: '2m',
          value: 1.8288000000000002
        }
      ])
    })

    it('converts meters to feet and inches', () => {
      const segments = new Parser().parse('1.94m')
      const result = new Converter(segments).convert(['ft', 'in-0'])
      expect(result).to.deep.eq([
        {
          unit: Parser.getUnitByLabel('ft'),
          formattedValue: '6ft',
          value: 6
        },
        {
          precision: '0',
          unit: Parser.getUnitByLabel('in'),
          formattedValue: '4in',
          value: 4.377952755904964
        }
      ])
    })


    it('support fractional precision', () => {
      const segments = new Parser().parse('1.94m')
      const result = new Converter(segments).convert(['feet', 'in-/8'])
      expect(result).to.deep.eq([
        {
          unit: Parser.getUnitByLabel('feet'),
          formattedValue: '6feet',
          value: 6
        },
        {
          isFractional: true,
          precision: '8',
          unit: Parser.getUnitByLabel('in'),
          formattedValue: '4 3/8in',
          value: 4.377952755904964
        }
      ])
    })
  })

  describe('_convert()', function () {
    it('converts a value to a new unit', () => {
      const result = Converter._convert(2, 'meter', 'inch')
      expect(result).to.eq(78.740157480314)
    })

    it('returns the same value if the units are the same', () => {
      const result = Converter._convert(2, 'meter', 'meter')
      expect(result).to.eq(2)
    })
  })

  describe('sum()', function () {
    it('works with a single segment', () => {
      const result = new Converter([
        {
          value: 6,
          unit: { name: Parser.FOOT }
        }
      ]).sum('meter')
      expect(result).to.eq(1.8288000000000002)
    })

    it('works with multiple segments', () => {
      const result = new Converter([
        {
          value: 6,
          unit: { name: Parser.FOOT }
        },
        {
          value: 4,
          unit: { name: Parser.INCH }
        }
      ]).sum('meter')
      expect(result).to.eq(1.9304000000000001)
    })

    it('fails if the unit is not valid', () => {
      expect(() => new Converter([]).sum('not-an-unit')).to.throw()
    })
  })
})
