const expect = require('chai').expect
const Parser = require('../src/parser.js')

describe('Parser', function () {
  this.timeout(30000)

  describe('parse()', function () {
    it('parses fractions', () => {
      const result = new Parser().parse('1/2in')
      expect(result).to.deep.eq([{
        formattedValue: '1/2',
        isFractional: true,
        segment: '1/2in',
        value: .5,
        unit: Parser.getUnitByLabel('in')
      }])
    })

    it('parses segments with an integer and a fraction', () => {
      const result = new Parser().parse('4 1/2in')
      expect(result).to.deep.eq([{
        formattedValue: '4 1/2',
        isFractional: true,
        segment: '4 1/2in',
        value: 4.5,
        unit: Parser.getUnitByLabel('in')
      }])
    })

    it('parses decimal numbers', () => {
      const result = new Parser().parse('10.2 km')
      expect(result).to.deep.eq([{
        formattedValue: '10.2',
        isFractional: false,
        segment: '10.2 km',
        value: 10.2,
        unit: Parser.getUnitByLabel('km')
      }])
    })

    it('parses segments with an integer and a fraction and the unit in between', () => {
      const result = new Parser().parse('6in 1/2')
      expect(result).to.deep.eq([{
        formattedValue: '6 1/2',
        isFractional: true,
        segment: '6in 1/2',
        value: 6.5,
        unit: Parser.getUnitByLabel('in')
      }])
    })

    it('parses multiple segments', () => {
      const result = new Parser().parse('6ft 1/2in')
      expect(result).to.deep.eq([
        {
          formattedValue: '1/2',
          isFractional: true,
          segment: '1/2in',
          value: .5,
          unit: Parser.getUnitByLabel('in')
        },
        {
          formattedValue: '6',
          isFractional: false,
          segment: '6ft',
          value: 6,
          unit: Parser.getUnitByLabel('ft')
        }
      ])
    })
  })
})
