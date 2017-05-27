const expect = require('chai').expect
const Fractioner = require('../src/fractioner.js')

describe('Fractioner', function () {
  this.timeout(30000)

  describe('parse()', function () {
    it('parses fractions', () => {
      const result = Fractioner.parse('1/2')
      expect(result).to.eq(.5)
    })

    it('supports unwanted characters', () => {
      const result = Fractioner.parse('1 000/2')
      expect(result).to.eq(500)
    })

    it('supports decimals', () => {
      const result = Fractioner.parse('10.6/2')
      expect(result).to.eq(5.3)
    })

    it('fails if the argument is not a fraction (missing /)', () => {
      expect(() => Fractioner.parse('10.62')).to.throw()
    })

    it('fails if the argument is not a fraction (extra /)', () => {
      expect(() => Fractioner.parse('1/6/2')).to.throw()
    })
  })

  describe('closest()', function () {
    it('returns the closest fraction to the value (1)', () => {
      const result = Fractioner.closest(.5)
      expect(result.fraction).to.eq('1/2')
    })

    it('returns the closest fraction to the value (2)', () => {
      const result = Fractioner.closest(.52)
      expect(result.fraction).to.eq('17/32')
    })

    it('takes a precision argument', () => {
      const result = Fractioner.closest(.52, 8)
      expect(result.fraction).to.eq('1/2')
    })

    it('fails if the value passed is greater than 1', () => {
      expect(() => Fractioner.closest(12)).to.throw()
    })

    it('fails if the value passed is 1', () => {
      expect(() => Fractioner.closest(12)).to.throw()
    })

    it('fails if the value passed is 0', () => {
      expect(() => Fractioner.closest(0)).to.throw()
    })

    it('expect a valid precision', () => {
      expect(() => Fractioner.closest(.52, 3)).to.throw()
    })
  })
})
