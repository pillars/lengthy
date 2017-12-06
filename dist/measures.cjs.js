'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var fractioner = function () {
  function Fractioner() {
    classCallCheck(this, Fractioner);
  }

  createClass(Fractioner, null, [{
    key: 'parse',
    value: function parse(fraction) {
      fraction = fraction.trim();
      var parts = fraction.split('/');

      if (parts.length !== 2) {
        throw new Error('Measures::Fractioner ' + fraction + ' is not a valid fraction.');
      }

      var result = Fractioner.parseNumber(parts[0]) / Fractioner.parseNumber(parts[1]);

      if (isNaN(result)) {
        throw new Error('Measures::Fractioner could not parse ' + fraction + ' into a number.');
      }

      return result;
    }
  }, {
    key: 'parseNumber',
    value: function parseNumber(number) {
      number = number.replace(/[^\d\.]/gi, '');
      return parseFloat(number, 10);
    }
  }, {
    key: 'closest',
    value: function closest(value, precision) {
      value = parseFloat(value, 10);

      if (!value || value >= 1) {
        throw new Error('\n        Measures::Fractioner::closest() expect a value that is exclusively\n        between 0 and 1 as an argument.\n      ');
      }

      var fractions = Fractioner.FRACTIONS;

      if (precision) {
        var validPrecisions = [2, 4, 8, 16, 32, 64];
        if (validPrecisions.indexOf(precision) < 0) {
          throw new Error('\n          Measures::Fractioner::closest() precision must be in ' + validPrecisions + '.\n        ');
        }

        fractions = fractions.filter(function (f) {
          return f.precision <= precision;
        });
      }

      var topMatch = void 0;
      var bottomMatch = void 0;
      var previousFraction = void 0;

      fractions.forEach(function (f) {
        if (!topMatch && f.value >= value) {
          topMatch = f;
          bottomMatch = previousFraction;
        }
        previousFraction = f;
      });

      if (bottomMatch && Math.abs(bottomMatch.value - value) < Math.abs(topMatch.value - value)) {
        return bottomMatch;
      } else {
        return topMatch;
      }
    }
  }, {
    key: 'FRACTIONS',
    get: function get$$1() {
      return [{ fraction: '1/64', precision: 64, value: 0.015625 }, { fraction: '1/32', precision: 32, value: 0.03125 }, { fraction: '3/64', precision: 64, value: 0.046875 }, { fraction: '1/16', precision: 16, value: 0.0625 }, { fraction: '5/64', precision: 64, value: 0.078125 }, { fraction: '3/32', precision: 32, value: 0.09375 }, { fraction: '7/64', precision: 64, value: 0.109375 }, { fraction: '1/8', precision: 8, value: 0.125 }, { fraction: '9/64', precision: 64, value: 0.140625 }, { fraction: '5/32', precision: 32, value: 0.15625 }, { fraction: '11/64', precision: 64, value: 0.171875 }, { fraction: '3/16', precision: 16, value: 0.1875 }, { fraction: '13/64', precision: 64, value: 0.203125 }, { fraction: '7/32', precision: 32, value: 0.21875 }, { fraction: '15/64', precision: 64, value: 0.234375 }, { fraction: '1/4', precision: 4, value: 0.25 }, { fraction: '17/64', precision: 64, value: 0.265625 }, { fraction: '9/32', precision: 32, value: 0.28125 }, { fraction: '19/64', precision: 64, value: 0.296875 }, { fraction: '5/16', precision: 16, value: 0.3125 }, { fraction: '21/64', precision: 64, value: 0.328125 }, { fraction: '11/32', precision: 32, value: 0.34375 }, { fraction: '23/64', precision: 64, value: 0.359375 }, { fraction: '3/8', precision: 8, value: 0.375 }, { fraction: '25/64', precision: 64, value: 0.390625 }, { fraction: '13/32', precision: 32, value: 0.40625 }, { fraction: '27/64', precision: 64, value: 0.421875 }, { fraction: '7/16', precision: 16, value: 0.4375 }, { fraction: '29/64', precision: 64, value: 0.453125 }, { fraction: '15/32', precision: 32, value: 0.46875 }, { fraction: '31/64', precision: 64, value: 0.484375 }, { fraction: '1/2', precision: 2, value: 0.5 }, { fraction: '17/32', precision: 32, value: 0.53125 }, { fraction: '9/16', precision: 16, value: 0.5625 }, { fraction: '19/32', precision: 32, value: 0.59375 }, { fraction: '5/8', precision: 8, value: 0.625 }, { fraction: '21/32', precision: 32, value: 0.65625 }, { fraction: '11/16', precision: 16, value: 0.6875 }, { fraction: '23/32', precision: 32, value: 0.71875 }, { fraction: '3/4', precision: 4, value: 0.75 }, { fraction: '25/32', precision: 32, value: 0.78125 }, { fraction: '13/16', precision: 16, value: 0.8125 }, { fraction: '27/32', precision: 32, value: 0.84375 }, { fraction: '7/8', precision: 8, value: 0.875 }, { fraction: '29/32', precision: 32, value: 0.90625 }, { fraction: '15/16', precision: 16, value: 0.9375 }, { fraction: '31/32', precision: 32, value: 0.96875 }];
    }
  }]);
  return Fractioner;
}();

var parser = function () {
  createClass(Parser, null, [{
    key: 'getUnitByLabel',
    value: function getUnitByLabel(label) {
      return Parser.UNITS.find(function (u) {
        return u.label === label;
      });
    }
  }, {
    key: 'METER',
    get: function get$$1() {
      return 'meter';
    }
  }, {
    key: 'KILOMETER',
    get: function get$$1() {
      return 'kilometer';
    }
  }, {
    key: 'CENTIMETER',
    get: function get$$1() {
      return 'centimeter';
    }
  }, {
    key: 'MILLIMETER',
    get: function get$$1() {
      return 'millimeter';
    }
  }, {
    key: 'FOOT',
    get: function get$$1() {
      return 'foot';
    }
  }, {
    key: 'INCH',
    get: function get$$1() {
      return 'inch';
    }
  }, {
    key: 'MILE',
    get: function get$$1() {
      return 'mile';
    }
  }, {
    key: 'YARD',
    get: function get$$1() {
      return 'yard';
    }
  }, {
    key: 'validUnits',
    get: function get$$1() {
      return [Parser.METER, Parser.KILOMETER, Parser.CENTIMETER, Parser.MILLIMETER, Parser.FOOT, Parser.INCH, Parser.MILE, Parser.YARD];
    }
  }, {
    key: 'UNITS',
    get: function get$$1() {
      return [{
        label: 'm',
        name: Parser.METER
      }, {
        label: 'meter',
        name: Parser.METER
      }, {
        label: 'meters',
        name: Parser.METER
      }, {
        label: 'km',
        name: Parser.KILOMETER
      }, {
        label: 'kilometer',
        name: Parser.KILOMETER
      }, {
        label: 'kilometers',
        name: Parser.KILOMETER
      }, {
        label: 'cm',
        name: Parser.CENTIMETER
      }, {
        label: 'centimeter',
        name: Parser.CENTIMETER
      }, {
        label: 'centimeters',
        name: Parser.CENTIMETER
      }, {
        label: 'mm',
        name: Parser.MILLIMETER
      }, {
        label: 'millimeter',
        name: Parser.MILLIMETER
      }, {
        label: 'millimeters',
        name: Parser.MILLIMETER
      }, {
        label: '\'',
        name: Parser.FOOT
      }, {
        label: 'ft',
        name: Parser.FOOT
      }, {
        label: 'foot',
        name: Parser.FOOT
      }, {
        label: 'feet',
        name: Parser.FOOT
      }, {
        label: '"',
        name: Parser.INCH
      }, {
        label: 'in',
        name: Parser.INCH
      }, {
        label: 'inch',
        name: Parser.INCH
      }, {
        label: 'inches',
        name: Parser.INCH
      }, {
        label: 'mi',
        name: Parser.MILE
      }, {
        label: 'mile',
        name: Parser.MILE
      }, {
        label: 'miles',
        name: Parser.MILE
      }, {
        label: 'yd',
        name: Parser.YARD
      }, {
        label: 'yard',
        name: Parser.YARD
      }, {
        label: 'yards',
        name: Parser.YARD
      }];
    }
  }]);

  function Parser() {
    classCallCheck(this, Parser);

    this.segments = [];
  }

  createClass(Parser, [{
    key: 'parse',
    value: function parse(string) {
      if (!string) {
        throw new Error('\n        Measures::Parser constructor() expect a string as an argument.\n        Received ' + string + '\n      ');
      }

      this.string = this._normalize(string);
      var result = void 0;
      var segment = void 0;
      var unit = void 0;
      var value = 0;

      // captures segment with the unit at the end: 4cm, 10 km, 4 1/2"
      var unitRegex = /([\d\s\.]+)?(?:\s*(\d+\/\d+))?\s*([^\d\s\/]+)$/;
      result = unitRegex.exec(string);
      if (result) {
        segment = result[0];
        unit = Parser.UNITS.find(function (u) {
          return u.label === result[3];
        });
        value += this._parseNumber(result[1]);
        value += this._parseNumber(result[2]);
      } else {
        // captures segment with unit in the middle: 4in 1/2
        var fractionRegex = /([\d\s]+)\s*([^\d\s]+)\s+(\d+\/\d+)$/;
        result = fractionRegex.exec(string);
        if (result) {
          segment = result[0];
          unit = Parser.UNITS.find(function (u) {
            return u.label === result[2];
          });
          value = this._parseNumber(result[1]);
          value += this._parseNumber(result[3]);
        }
      }

      if (!unit) {
        throw new Error('\n        Measures::Parser could not guess unit of ' + string + '.\n        Please pass the unit explicitly via the "unit" option.\n      ');
      }

      this.segments.push({
        formattedValue: this._normalize(segment.replace(unit.label, '')),
        isFractional: segment.indexOf('/') > -1,
        segment: this._normalize(segment),
        unit: unit,
        value: value
      });
      string = string.replace(segment, '');

      if (string) {
        return this.parse(string);
      } else {
        return this.segments;
      }
    }
  }, {
    key: '_parseNumber',
    value: function _parseNumber(number) {
      if (!number || !String(number).trim()) {
        return 0;
      }
      var isFractional = number.indexOf('/') > -1;
      var value = void 0;

      if (isFractional) {
        value = fractioner.parse(number);
      } else if (number) {
        value = fractioner.parseNumber(number);
      }

      if (isNaN(value)) {
        throw new Error('\n        Measures::Parser could not parse value of ' + number + '.\n        Please pass the unit explicitly via the "unit" option.\n      ');
      }

      return value;
    }
  }, {
    key: '_normalize',
    value: function _normalize(string) {
      return String(string).trim().toLowerCase().replace(/ +/g, ' ');
    }
  }]);
  return Parser;
}();

var converter = function () {
  createClass(Converter, null, [{
    key: '_convert',
    value: function _convert(value, fromUnit, toUnit) {
      if (typeof fromUnit === 'string') {
        fromUnit = parser.getUnitByLabel(fromUnit);
      }

      if (typeof toUnit === 'string') {
        toUnit = parser.getUnitByLabel(toUnit);
      }

      return value * Converter.CONVERSIONS[fromUnit.name][toUnit.name];
    }
  }, {
    key: 'CONVERSIONS',
    get: function get$$1() {
      return {
        millimeter: {
          millimeter: 1,
          centimeter: .1,
          meter: .001,
          kilometer: .000001,
          inch: .039370078740157,
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
      };
    }
  }]);

  function Converter(segments) {
    classCallCheck(this, Converter);

    if (!Array.isArray(segments)) {
      throw new Error('\n        Measures::Converter constructor() expect an array of segments as an argument.\n        Received ' + segments + '\n      ');
    }

    this.segments = segments;
  }

  createClass(Converter, [{
    key: 'sum',
    value: function sum(unitName) {
      var unit = void 0;

      if (typeof unitName !== 'string') {
        unit = unitName;
      } else {
        unit = parser.getUnitByLabel(unitName);
      }

      if (!unit) {
        throw new Error('\n        Measures::Converter cannot sum() with the unit ' + unitName + '\n      ');
      }

      var total = 0;
      this.segments.forEach(function (segment) {
        total += Converter._convert(segment.value, segment.unit.name, unit.name);
      });
      return total;
    }
  }, {
    key: 'convert',
    value: function convert(units) {
      if (!Array.isArray(units)) {
        units = [units];
      }

      var currentUnitName = units[0].split('-')[0];
      var value = this.sum(currentUnitName);
      var result = [];

      for (var index in units) {
        var parts = units[index].split('-');
        var unitName = parts[0];
        var precision = parts[1];
        var unit = parser.getUnitByLabel(unitName);
        var segment = { unit: unit };
        var lastUnit = units.length === parseInt(index, 10) + 1;
        var remainder = 0;

        if (!unit) {
          throw new Error('Measures::Converter cannot convert to unknown unit ' + unitName);
        }

        if (unitName !== currentUnitName) {
          value = Converter._convert(value, currentUnitName, unitName);
        }

        if (!lastUnit) {
          segment.value = Math.floor(value);
          remainder = value - segment.value;
        } else {
          segment.value = value;
          remainder = 0;
        }

        if (precision) {
          segment.precision = precision;
          if (precision.charAt('0') === '/') {
            segment.isFractional = true;
            segment.precision = precision.substring(1);

            var integerPart = Math.floor(segment.value);
            var decimalPart = segment.value - integerPart;
            var _parts = [];

            if (integerPart) {
              _parts.push(integerPart);
            }
            if (decimalPart) {
              _parts.push(fractioner.closest(decimalPart).fraction);
              remainder = 0;
            }
            segment.formattedValue = _parts.join(' ');
          } else if (precision === 'round') {
            segment.formattedValue = Math.round(segment.value);
          } else if (precision === 'floor' || precision === '0') {
            segment.formattedValue = Math.floor(segment.value);
          } else if (precision === 'ceil') {
            segment.formattedValue = Math.ceil(segment.value);
          } else {
            segment.formattedValue = segment.value.toPrecision(precision);
          }
        } else {
          segment.formattedValue = segment.value;
        }
        segment.formattedValue += unit.label;

        result.push(segment);

        currentUnitName = unitName;
        value = remainder;
      }

      return result;
    }
  }]);
  return Converter;
}();

var measures = function () {
  function Measures() {
    classCallCheck(this, Measures);
  }

  createClass(Measures, [{
    key: 'from',
    value: function from(string) {
      this.segments = new parser().parse(string);
      return this;
    }
  }, {
    key: 'to',
    value: function to(units) {
      var segments = new converter(this.segments).convert(units);
      return segments.map(function (s) {
        return s.formattedValue;
      }).join(' ');
    }
  }]);
  return Measures;
}();

module.exports = measures;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZXMuY2pzLmpzIiwic291cmNlcyI6WyIuLi9zcmMvZnJhY3Rpb25lci5qcyIsIi4uL3NyYy9wYXJzZXIuanMiLCIuLi9zcmMvY29udmVydGVyLmpzIiwiLi4vc3JjL21lYXN1cmVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gY2xhc3MgRnJhY3Rpb25lciB7XG4gIHN0YXRpYyBnZXQgRlJBQ1RJT05TKCkge1xuICAgIHJldHVybiBbXG4gICAgICB7IGZyYWN0aW9uOiAnMS82NCcsIHByZWNpc2lvbjogNjQsIHZhbHVlOiAwLjAxNTYyNSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzEvMzInLCBwcmVjaXNpb246IDMyLCB2YWx1ZTogMC4wMzEyNSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzMvNjQnLCBwcmVjaXNpb246IDY0LCB2YWx1ZTogMC4wNDY4NzUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcxLzE2JywgcHJlY2lzaW9uOiAxNiwgdmFsdWU6IDAuMDYyNSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzUvNjQnLCBwcmVjaXNpb246IDY0LCB2YWx1ZTogMC4wNzgxMjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICczLzMyJywgcHJlY2lzaW9uOiAzMiwgdmFsdWU6IDAuMDkzNzUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICc3LzY0JywgcHJlY2lzaW9uOiA2NCwgdmFsdWU6IDAuMTA5Mzc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMS84JywgcHJlY2lzaW9uOiA4LCB2YWx1ZTogMC4xMjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICc5LzY0JywgcHJlY2lzaW9uOiA2NCwgdmFsdWU6IDAuMTQwNjI1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnNS8zMicsIHByZWNpc2lvbjogMzIsIHZhbHVlOiAwLjE1NjI1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMTEvNjQnLCBwcmVjaXNpb246IDY0LCB2YWx1ZTogMC4xNzE4NzUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICczLzE2JywgcHJlY2lzaW9uOiAxNiwgdmFsdWU6IDAuMTg3NSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzEzLzY0JywgcHJlY2lzaW9uOiA2NCwgdmFsdWU6IDAuMjAzMTI1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnNy8zMicsIHByZWNpc2lvbjogMzIsIHZhbHVlOiAwLjIxODc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMTUvNjQnLCBwcmVjaXNpb246IDY0LCB2YWx1ZTogMC4yMzQzNzUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcxLzQnLCBwcmVjaXNpb246IDQsIHZhbHVlOiAwLjI1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMTcvNjQnLCBwcmVjaXNpb246IDY0LCB2YWx1ZTogMC4yNjU2MjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICc5LzMyJywgcHJlY2lzaW9uOiAzMiwgdmFsdWU6IDAuMjgxMjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcxOS82NCcsIHByZWNpc2lvbjogNjQsIHZhbHVlOiAwLjI5Njg3NSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzUvMTYnLCBwcmVjaXNpb246IDE2LCB2YWx1ZTogMC4zMTI1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMjEvNjQnLCBwcmVjaXNpb246IDY0LCB2YWx1ZTogMC4zMjgxMjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcxMS8zMicsIHByZWNpc2lvbjogMzIsIHZhbHVlOiAwLjM0Mzc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMjMvNjQnLCBwcmVjaXNpb246IDY0LCB2YWx1ZTogMC4zNTkzNzUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICczLzgnLCBwcmVjaXNpb246IDgsIHZhbHVlOiAwLjM3NSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzI1LzY0JywgcHJlY2lzaW9uOiA2NCwgdmFsdWU6IDAuMzkwNjI1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMTMvMzInLCBwcmVjaXNpb246IDMyLCB2YWx1ZTogMC40MDYyNSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzI3LzY0JywgcHJlY2lzaW9uOiA2NCwgdmFsdWU6IDAuNDIxODc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnNy8xNicsIHByZWNpc2lvbjogMTYsIHZhbHVlOiAwLjQzNzUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcyOS82NCcsIHByZWNpc2lvbjogNjQsIHZhbHVlOiAwLjQ1MzEyNSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzE1LzMyJywgcHJlY2lzaW9uOiAzMiwgdmFsdWU6IDAuNDY4NzUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICczMS82NCcsIHByZWNpc2lvbjogNjQsIHZhbHVlOiAwLjQ4NDM3NSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzEvMicsIHByZWNpc2lvbjogMiwgdmFsdWU6IDAuNSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzE3LzMyJywgcHJlY2lzaW9uOiAzMiwgdmFsdWU6IDAuNTMxMjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICc5LzE2JywgcHJlY2lzaW9uOiAxNiwgdmFsdWU6IDAuNTYyNSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzE5LzMyJywgcHJlY2lzaW9uOiAzMiwgdmFsdWU6IDAuNTkzNzUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICc1LzgnLCBwcmVjaXNpb246IDgsIHZhbHVlOiAwLjYyNSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzIxLzMyJywgcHJlY2lzaW9uOiAzMiwgdmFsdWU6IDAuNjU2MjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcxMS8xNicsIHByZWNpc2lvbjogMTYsIHZhbHVlOiAwLjY4NzUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcyMy8zMicsIHByZWNpc2lvbjogMzIsIHZhbHVlOiAwLjcxODc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMy80JywgcHJlY2lzaW9uOiA0LCB2YWx1ZTogMC43NSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzI1LzMyJywgcHJlY2lzaW9uOiAzMiwgdmFsdWU6IDAuNzgxMjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcxMy8xNicsIHByZWNpc2lvbjogMTYsIHZhbHVlOiAwLjgxMjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcyNy8zMicsIHByZWNpc2lvbjogMzIsIHZhbHVlOiAwLjg0Mzc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnNy84JywgcHJlY2lzaW9uOiA4LCB2YWx1ZTogMC44NzUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcyOS8zMicsIHByZWNpc2lvbjogMzIsIHZhbHVlOiAwLjkwNjI1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMTUvMTYnLCBwcmVjaXNpb246IDE2LCB2YWx1ZTogMC45Mzc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMzEvMzInLCBwcmVjaXNpb246IDMyLCB2YWx1ZTogMC45Njg3NSB9XG4gICAgXVxuICB9XG5cbiAgc3RhdGljIHBhcnNlKGZyYWN0aW9uKSB7XG4gICAgZnJhY3Rpb24gPSBmcmFjdGlvbi50cmltKClcbiAgICBjb25zdCBwYXJ0cyA9IGZyYWN0aW9uLnNwbGl0KCcvJylcblxuICAgIGlmIChwYXJ0cy5sZW5ndGggIT09IDIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTWVhc3VyZXM6OkZyYWN0aW9uZXIgJHtmcmFjdGlvbn0gaXMgbm90IGEgdmFsaWQgZnJhY3Rpb24uYClcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBGcmFjdGlvbmVyLnBhcnNlTnVtYmVyKHBhcnRzWzBdKSAvIEZyYWN0aW9uZXIucGFyc2VOdW1iZXIocGFydHNbMV0pXG5cbiAgICBpZiAoaXNOYU4ocmVzdWx0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBNZWFzdXJlczo6RnJhY3Rpb25lciBjb3VsZCBub3QgcGFyc2UgJHtmcmFjdGlvbn0gaW50byBhIG51bWJlci5gKVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZU51bWJlcihudW1iZXIpIHtcbiAgICBudW1iZXIgPSBudW1iZXIucmVwbGFjZSgvW15cXGRcXC5dL2dpLCAnJylcbiAgICByZXR1cm4gcGFyc2VGbG9hdChudW1iZXIsIDEwKVxuICB9XG5cbiAgc3RhdGljIGNsb3Nlc3QodmFsdWUsIHByZWNpc2lvbikge1xuICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSwgMTApXG5cbiAgICBpZiAoIXZhbHVlIHx8IHZhbHVlID49IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXG4gICAgICAgIE1lYXN1cmVzOjpGcmFjdGlvbmVyOjpjbG9zZXN0KCkgZXhwZWN0IGEgdmFsdWUgdGhhdCBpcyBleGNsdXNpdmVseVxuICAgICAgICBiZXR3ZWVuIDAgYW5kIDEgYXMgYW4gYXJndW1lbnQuXG4gICAgICBgKVxuICAgIH1cblxuXG4gICAgbGV0IGZyYWN0aW9ucyA9IEZyYWN0aW9uZXIuRlJBQ1RJT05TXG5cbiAgICBpZiAocHJlY2lzaW9uKSB7XG4gICAgICBjb25zdCB2YWxpZFByZWNpc2lvbnMgPSBbMiwgNCwgOCwgMTYsIDMyLCA2NF1cbiAgICAgIGlmICh2YWxpZFByZWNpc2lvbnMuaW5kZXhPZihwcmVjaXNpb24pIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFxuICAgICAgICAgIE1lYXN1cmVzOjpGcmFjdGlvbmVyOjpjbG9zZXN0KCkgcHJlY2lzaW9uIG11c3QgYmUgaW4gJHt2YWxpZFByZWNpc2lvbnN9LlxuICAgICAgICBgKVxuICAgICAgfVxuXG4gICAgICBmcmFjdGlvbnMgPSBmcmFjdGlvbnMuZmlsdGVyKGYgPT4gZi5wcmVjaXNpb24gPD0gcHJlY2lzaW9uKVxuICAgIH1cblxuICAgIGxldCB0b3BNYXRjaFxuICAgIGxldCBib3R0b21NYXRjaFxuICAgIGxldCBwcmV2aW91c0ZyYWN0aW9uXG5cbiAgICBmcmFjdGlvbnMuZm9yRWFjaChmID0+IHtcbiAgICAgIGlmICghdG9wTWF0Y2ggJiYgZi52YWx1ZSA+PSB2YWx1ZSkge1xuICAgICAgICB0b3BNYXRjaCA9IGZcbiAgICAgICAgYm90dG9tTWF0Y2ggPSBwcmV2aW91c0ZyYWN0aW9uXG4gICAgICB9XG4gICAgICBwcmV2aW91c0ZyYWN0aW9uID0gZlxuICAgIH0pXG5cbiAgICBpZiAoXG4gICAgICBib3R0b21NYXRjaCAmJlxuICAgICAgTWF0aC5hYnMoYm90dG9tTWF0Y2gudmFsdWUgLSB2YWx1ZSkgPCBNYXRoLmFicyh0b3BNYXRjaC52YWx1ZSAtIHZhbHVlKVxuICAgICkge1xuICAgICAgcmV0dXJuIGJvdHRvbU1hdGNoXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHRvcE1hdGNoXG4gICAgfVxuICB9XG59XG4iLCJjb25zdCBGcmFjdGlvbmVyID0gcmVxdWlyZSgnLi9mcmFjdGlvbmVyJylcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBQYXJzZXIge1xuICBzdGF0aWMgZ2V0IE1FVEVSKCkgeyByZXR1cm4gJ21ldGVyJyB9XG4gIHN0YXRpYyBnZXQgS0lMT01FVEVSKCkgeyByZXR1cm4gJ2tpbG9tZXRlcicgfVxuICBzdGF0aWMgZ2V0IENFTlRJTUVURVIoKSB7IHJldHVybiAnY2VudGltZXRlcicgfVxuICBzdGF0aWMgZ2V0IE1JTExJTUVURVIoKSB7IHJldHVybiAnbWlsbGltZXRlcicgfVxuICBzdGF0aWMgZ2V0IEZPT1QoKSB7IHJldHVybiAnZm9vdCcgfVxuICBzdGF0aWMgZ2V0IElOQ0goKSB7IHJldHVybiAnaW5jaCcgfVxuICBzdGF0aWMgZ2V0IE1JTEUoKSB7IHJldHVybiAnbWlsZScgfVxuICBzdGF0aWMgZ2V0IFlBUkQoKSB7IHJldHVybiAneWFyZCcgfVxuICBzdGF0aWMgZ2V0IHZhbGlkVW5pdHMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIFBhcnNlci5NRVRFUixcbiAgICAgIFBhcnNlci5LSUxPTUVURVIsXG4gICAgICBQYXJzZXIuQ0VOVElNRVRFUixcbiAgICAgIFBhcnNlci5NSUxMSU1FVEVSLFxuICAgICAgUGFyc2VyLkZPT1QsXG4gICAgICBQYXJzZXIuSU5DSCxcbiAgICAgIFBhcnNlci5NSUxFLFxuICAgICAgUGFyc2VyLllBUkRcbiAgICBdXG4gIH1cblxuICBzdGF0aWMgZ2V0IFVOSVRTKCkge1xuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnbScsXG4gICAgICAgIG5hbWU6IFBhcnNlci5NRVRFUlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICdtZXRlcicsXG4gICAgICAgIG5hbWU6IFBhcnNlci5NRVRFUlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICdtZXRlcnMnLFxuICAgICAgICBuYW1lOiBQYXJzZXIuTUVURVJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAna20nLFxuICAgICAgICBuYW1lOiBQYXJzZXIuS0lMT01FVEVSXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ2tpbG9tZXRlcicsXG4gICAgICAgIG5hbWU6IFBhcnNlci5LSUxPTUVURVJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAna2lsb21ldGVycycsXG4gICAgICAgIG5hbWU6IFBhcnNlci5LSUxPTUVURVJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnY20nLFxuICAgICAgICBuYW1lOiBQYXJzZXIuQ0VOVElNRVRFUlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICdjZW50aW1ldGVyJyxcbiAgICAgICAgbmFtZTogUGFyc2VyLkNFTlRJTUVURVJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnY2VudGltZXRlcnMnLFxuICAgICAgICBuYW1lOiBQYXJzZXIuQ0VOVElNRVRFUlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICdtbScsXG4gICAgICAgIG5hbWU6IFBhcnNlci5NSUxMSU1FVEVSXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ21pbGxpbWV0ZXInLFxuICAgICAgICBuYW1lOiBQYXJzZXIuTUlMTElNRVRFUlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICdtaWxsaW1ldGVycycsXG4gICAgICAgIG5hbWU6IFBhcnNlci5NSUxMSU1FVEVSXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ1xcJycsXG4gICAgICAgIG5hbWU6IFBhcnNlci5GT09UXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ2Z0JyxcbiAgICAgICAgbmFtZTogUGFyc2VyLkZPT1RcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnZm9vdCcsXG4gICAgICAgIG5hbWU6IFBhcnNlci5GT09UXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ2ZlZXQnLFxuICAgICAgICBuYW1lOiBQYXJzZXIuRk9PVFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICdcIicsXG4gICAgICAgIG5hbWU6IFBhcnNlci5JTkNIXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ2luJyxcbiAgICAgICAgbmFtZTogUGFyc2VyLklOQ0hcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnaW5jaCcsXG4gICAgICAgIG5hbWU6IFBhcnNlci5JTkNIXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ2luY2hlcycsXG4gICAgICAgIG5hbWU6IFBhcnNlci5JTkNIXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ21pJyxcbiAgICAgICAgbmFtZTogUGFyc2VyLk1JTEVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnbWlsZScsXG4gICAgICAgIG5hbWU6IFBhcnNlci5NSUxFXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ21pbGVzJyxcbiAgICAgICAgbmFtZTogUGFyc2VyLk1JTEVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAneWQnLFxuICAgICAgICBuYW1lOiBQYXJzZXIuWUFSRFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICd5YXJkJyxcbiAgICAgICAgbmFtZTogUGFyc2VyLllBUkRcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAneWFyZHMnLFxuICAgICAgICBuYW1lOiBQYXJzZXIuWUFSRFxuICAgICAgfSxcbiAgICBdXG4gIH1cblxuICBzdGF0aWMgZ2V0VW5pdEJ5TGFiZWwobGFiZWwpIHtcbiAgICByZXR1cm4gUGFyc2VyLlVOSVRTLmZpbmQodSA9PiB1LmxhYmVsID09PSBsYWJlbClcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2VnbWVudHMgPSBbXVxuICB9XG5cbiAgcGFyc2Uoc3RyaW5nKSB7XG4gICAgaWYgKCFzdHJpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXG4gICAgICAgIE1lYXN1cmVzOjpQYXJzZXIgY29uc3RydWN0b3IoKSBleHBlY3QgYSBzdHJpbmcgYXMgYW4gYXJndW1lbnQuXG4gICAgICAgIFJlY2VpdmVkICR7c3RyaW5nfVxuICAgICAgYClcbiAgICB9XG5cbiAgICB0aGlzLnN0cmluZyA9IHRoaXMuX25vcm1hbGl6ZShzdHJpbmcpXG4gICAgbGV0IHJlc3VsdFxuICAgIGxldCBzZWdtZW50XG4gICAgbGV0IHVuaXRcbiAgICBsZXQgdmFsdWUgPSAwXG5cbiAgICAvLyBjYXB0dXJlcyBzZWdtZW50IHdpdGggdGhlIHVuaXQgYXQgdGhlIGVuZDogNGNtLCAxMCBrbSwgNCAxLzJcIlxuICAgIGNvbnN0IHVuaXRSZWdleCA9IC8oW1xcZFxcc1xcLl0rKT8oPzpcXHMqKFxcZCtcXC9cXGQrKSk/XFxzKihbXlxcZFxcc1xcL10rKSQvXG4gICAgcmVzdWx0ID0gdW5pdFJlZ2V4LmV4ZWMoc3RyaW5nKVxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHNlZ21lbnQgPSByZXN1bHRbMF1cbiAgICAgIHVuaXQgPSBQYXJzZXIuVU5JVFMuZmluZCh1ID0+IHUubGFiZWwgPT09IHJlc3VsdFszXSlcbiAgICAgIHZhbHVlICs9IHRoaXMuX3BhcnNlTnVtYmVyKHJlc3VsdFsxXSlcbiAgICAgIHZhbHVlICs9IHRoaXMuX3BhcnNlTnVtYmVyKHJlc3VsdFsyXSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvLyBjYXB0dXJlcyBzZWdtZW50IHdpdGggdW5pdCBpbiB0aGUgbWlkZGxlOiA0aW4gMS8yXG4gICAgICBjb25zdCBmcmFjdGlvblJlZ2V4ID0gLyhbXFxkXFxzXSspXFxzKihbXlxcZFxcc10rKVxccysoXFxkK1xcL1xcZCspJC9cbiAgICAgIHJlc3VsdCA9IGZyYWN0aW9uUmVnZXguZXhlYyhzdHJpbmcpXG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHNlZ21lbnQgPSByZXN1bHRbMF1cbiAgICAgICAgdW5pdCA9IFBhcnNlci5VTklUUy5maW5kKHUgPT4gdS5sYWJlbCA9PT0gcmVzdWx0WzJdKVxuICAgICAgICB2YWx1ZSA9IHRoaXMuX3BhcnNlTnVtYmVyKHJlc3VsdFsxXSlcbiAgICAgICAgdmFsdWUgKz0gdGhpcy5fcGFyc2VOdW1iZXIocmVzdWx0WzNdKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdW5pdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgICAgTWVhc3VyZXM6OlBhcnNlciBjb3VsZCBub3QgZ3Vlc3MgdW5pdCBvZiAke3N0cmluZ30uXG4gICAgICAgIFBsZWFzZSBwYXNzIHRoZSB1bml0IGV4cGxpY2l0bHkgdmlhIHRoZSBcInVuaXRcIiBvcHRpb24uXG4gICAgICBgKVxuICAgIH1cblxuICAgIHRoaXMuc2VnbWVudHMucHVzaCh7XG4gICAgICBmb3JtYXR0ZWRWYWx1ZTogdGhpcy5fbm9ybWFsaXplKHNlZ21lbnQucmVwbGFjZSh1bml0LmxhYmVsLCAnJykpLFxuICAgICAgaXNGcmFjdGlvbmFsOiBzZWdtZW50LmluZGV4T2YoJy8nKSA+IC0xLFxuICAgICAgc2VnbWVudDogdGhpcy5fbm9ybWFsaXplKHNlZ21lbnQpLFxuICAgICAgdW5pdCxcbiAgICAgIHZhbHVlXG4gICAgfSlcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShzZWdtZW50LCAnJylcblxuICAgIGlmIChzdHJpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlKHN0cmluZylcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWdtZW50c1xuICAgIH1cbiAgfVxuXG4gIF9wYXJzZU51bWJlcihudW1iZXIpIHtcbiAgICBpZiAoIW51bWJlciB8fCAhU3RyaW5nKG51bWJlcikudHJpbSgpKSB7XG4gICAgICByZXR1cm4gMFxuICAgIH1cbiAgICBjb25zdCBpc0ZyYWN0aW9uYWwgPSBudW1iZXIuaW5kZXhPZignLycpID4gLTFcbiAgICBsZXQgdmFsdWVcblxuICAgIGlmIChpc0ZyYWN0aW9uYWwpIHtcbiAgICAgIHZhbHVlID0gRnJhY3Rpb25lci5wYXJzZShudW1iZXIpXG4gICAgfVxuICAgIGVsc2UgaWYgKG51bWJlcikge1xuICAgICAgdmFsdWUgPSBGcmFjdGlvbmVyLnBhcnNlTnVtYmVyKG51bWJlcilcbiAgICB9XG5cbiAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFxuICAgICAgICBNZWFzdXJlczo6UGFyc2VyIGNvdWxkIG5vdCBwYXJzZSB2YWx1ZSBvZiAke251bWJlcn0uXG4gICAgICAgIFBsZWFzZSBwYXNzIHRoZSB1bml0IGV4cGxpY2l0bHkgdmlhIHRoZSBcInVuaXRcIiBvcHRpb24uXG4gICAgICBgKVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgX25vcm1hbGl6ZShzdHJpbmcpIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZykudHJpbSgpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvICsvZywgJyAnKVxuICB9XG59XG4iLCJjb25zdCBGcmFjdGlvbmVyID0gcmVxdWlyZSgnLi9mcmFjdGlvbmVyLmpzJylcbmNvbnN0IFBhcnNlciA9IHJlcXVpcmUoJy4vcGFyc2VyLmpzJylcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBDb252ZXJ0ZXIge1xuICBzdGF0aWMgZ2V0IENPTlZFUlNJT05TKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtaWxsaW1ldGVyOiB7XG4gICAgICAgIG1pbGxpbWV0ZXI6IDEsXG4gICAgICAgIGNlbnRpbWV0ZXI6IC4xLFxuICAgICAgICBtZXRlcjogLjAwMSxcbiAgICAgICAga2lsb21ldGVyOiAuMDAwMDAxLFxuICAgICAgICBpbmNoOiAuMDM5MzcwMDc4NzQwMTU3XHQsXG4gICAgICAgIGZvb3Q6IC4wMDMyODA4Mzk4OTUwMTMxLFxuICAgICAgICB5YXJkOiAuMDAxMDkzNjEzMjk4MzM3NyxcbiAgICAgICAgbWlsZTogLjAwMDAwMDYyMTM3MTE5MjIzNzMzXG4gICAgICB9LFxuICAgICAgY2VudGltZXRlcjoge1xuICAgICAgICBtaWxsaW1ldGVyOiAxMCxcbiAgICAgICAgY2VudGltZXRlcjogMSxcbiAgICAgICAgbWV0ZXI6IC4wMSxcbiAgICAgICAga2lsb21ldGVyOiAuMDAwMDEsXG4gICAgICAgIGluY2g6IC4zOTM3MDA3ODc0MDE1NyxcbiAgICAgICAgZm9vdDogLjAzMjgwODM5ODk1MDEzMSxcbiAgICAgICAgeWFyZDogLjAxMDkzNjEzMjk4MzM3NyxcbiAgICAgICAgbWlsZTogLjAwMDAwNjIxMzcxMTkyMjM3MzNcbiAgICAgIH0sXG4gICAgICBtZXRlcjoge1xuICAgICAgICBtaWxsaW1ldGVyOiAxMDAwLFxuICAgICAgICBjZW50aW1ldGVyOiAxMDAsXG4gICAgICAgIG1ldGVyOiAxLFxuICAgICAgICBraWxvbWV0ZXI6IC4wMDEsXG4gICAgICAgIGluY2g6IDM5LjM3MDA3ODc0MDE1NyxcbiAgICAgICAgZm9vdDogMy4yODA4Mzk4OTUwMTMxLFxuICAgICAgICB5YXJkOiAxLjA5MzYxMzI5ODMzNzcsXG4gICAgICAgIG1pbGU6IC4wMDA2MjEzNzExOTIyMzczM1xuICAgICAgfSxcbiAgICAgIGtpbG9tZXRlcjoge1xuICAgICAgICBtaWxsaW1ldGVyOiAxMDAwMDAwLFxuICAgICAgICBjZW50aW1ldGVyOiAxMDAwMDAsXG4gICAgICAgIG1ldGVyOiAxMDAwLFxuICAgICAgICBraWxvbWV0ZXI6IDEsXG4gICAgICAgIGluY2g6IDM5MzcwLjA3ODc0MDE1NyxcbiAgICAgICAgZm9vdDogMzI4MC44Mzk4OTUwMTMxLFxuICAgICAgICB5YXJkOiAxMDkzLjYxMzI5ODMzNzcsXG4gICAgICAgIG1pbGU6IC42MjEzNzExOTIyMzczM1xuICAgICAgfSxcbiAgICAgIGluY2g6IHtcbiAgICAgICAgbWlsbGltZXRlcjogMjUuNCxcbiAgICAgICAgY2VudGltZXRlcjogMi41NCxcbiAgICAgICAgbWV0ZXI6IDAuMDI1NCxcbiAgICAgICAga2lsb21ldGVyOiAwLjAwMDAyNTQsXG4gICAgICAgIGluY2g6IDEsXG4gICAgICAgIGZvb3Q6IDAuMDgzMzMzMzMzMzMzMzMzLFxuICAgICAgICB5YXJkOiAwLjAyNzc3Nzc3Nzc3Nzc3OCxcbiAgICAgICAgbWlsZTogMC4wMDAwMTU3ODI4MjgyODI4MjhcbiAgICAgIH0sXG4gICAgICBmb290OiB7XG4gICAgICAgIG1pbGxpbWV0ZXI6IDMwNC44LFxuICAgICAgICBjZW50aW1ldGVyOiAzMC40OCxcbiAgICAgICAgbWV0ZXI6IDAuMzA0OCxcbiAgICAgICAga2lsb21ldGVyOiAwLjAwMDMwNDgsXG4gICAgICAgIGluY2g6IDEyLFxuICAgICAgICBmb290OiAxLFxuICAgICAgICB5YXJkOiAwLjMzMzMzMzMzMzMzMzMzLFxuICAgICAgICBtaWxlOiAwLjAwMDE4OTM5MzkzOTM5Mzk0XG4gICAgICB9LFxuICAgICAgeWFyZDoge1xuICAgICAgICBtaWxsaW1ldGVyOiA5MTQuNCxcbiAgICAgICAgY2VudGltZXRlcjogOTEuNDQsXG4gICAgICAgIG1ldGVyOiAwLjkxNDQsXG4gICAgICAgIGtpbG9tZXRlcjogMC4wMDA5MTQ0LFxuICAgICAgICBpbmNoOiAzNixcbiAgICAgICAgZm9vdDogMyxcbiAgICAgICAgeWFyZDogMSxcbiAgICAgICAgbWlsZTogMC4wMDA1NjgxODE4MTgxODE4MlxuICAgICAgfSxcbiAgICAgIG1pbGU6IHtcbiAgICAgICAgbWlsbGltZXRlcjogMTYwOTM0NCxcbiAgICAgICAgY2VudGltZXRlcjogMTYwOTM0LjQsXG4gICAgICAgIG1ldGVyOiAxNjA5LjM0NCxcbiAgICAgICAga2lsb21ldGVyOiAxLjYwOTM0NCxcbiAgICAgICAgaW5jaDogNjMzNjAsXG4gICAgICAgIGZvb3Q6IDUyODAsXG4gICAgICAgIHlhcmQ6IDE3NjAsXG4gICAgICAgIG1pbGU6IDFcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgX2NvbnZlcnQodmFsdWUsIGZyb21Vbml0LCB0b1VuaXQpIHtcbiAgICBpZiAodHlwZW9mIGZyb21Vbml0ID09PSAnc3RyaW5nJykge1xuICAgICAgZnJvbVVuaXQgPSBQYXJzZXIuZ2V0VW5pdEJ5TGFiZWwoZnJvbVVuaXQpXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0b1VuaXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0b1VuaXQgPSBQYXJzZXIuZ2V0VW5pdEJ5TGFiZWwodG9Vbml0KVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZSAqIENvbnZlcnRlci5DT05WRVJTSU9OU1tmcm9tVW5pdC5uYW1lXVt0b1VuaXQubmFtZV1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHNlZ21lbnRzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHNlZ21lbnRzKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgICAgTWVhc3VyZXM6OkNvbnZlcnRlciBjb25zdHJ1Y3RvcigpIGV4cGVjdCBhbiBhcnJheSBvZiBzZWdtZW50cyBhcyBhbiBhcmd1bWVudC5cbiAgICAgICAgUmVjZWl2ZWQgJHtzZWdtZW50c31cbiAgICAgIGApXG4gICAgfVxuXG4gICAgdGhpcy5zZWdtZW50cyA9IHNlZ21lbnRzXG4gIH1cblxuICBzdW0odW5pdE5hbWUpIHtcbiAgICBsZXQgdW5pdFxuXG4gICAgaWYgKHR5cGVvZiB1bml0TmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHVuaXQgPSB1bml0TmFtZVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHVuaXQgPSBQYXJzZXIuZ2V0VW5pdEJ5TGFiZWwodW5pdE5hbWUpXG4gICAgfVxuXG4gICAgaWYgKCF1bml0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFxuICAgICAgICBNZWFzdXJlczo6Q29udmVydGVyIGNhbm5vdCBzdW0oKSB3aXRoIHRoZSB1bml0ICR7dW5pdE5hbWV9XG4gICAgICBgKVxuICAgIH1cblxuICAgIGxldCB0b3RhbCA9IDBcbiAgICB0aGlzLnNlZ21lbnRzLmZvckVhY2goc2VnbWVudCA9PiB7XG4gICAgICB0b3RhbCArPSBDb252ZXJ0ZXIuX2NvbnZlcnQoc2VnbWVudC52YWx1ZSwgc2VnbWVudC51bml0Lm5hbWUsIHVuaXQubmFtZSlcbiAgICB9KVxuICAgIHJldHVybiB0b3RhbFxuICB9XG5cbiAgY29udmVydCh1bml0cykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh1bml0cykpIHtcbiAgICAgIHVuaXRzID0gW3VuaXRzXVxuICAgIH1cblxuICAgIGxldCBjdXJyZW50VW5pdE5hbWUgPSB1bml0c1swXS5zcGxpdCgnLScpWzBdXG4gICAgbGV0IHZhbHVlID0gdGhpcy5zdW0oY3VycmVudFVuaXROYW1lKVxuICAgIGxldCByZXN1bHQgPSBbXVxuXG4gICAgZm9yIChsZXQgaW5kZXggaW4gdW5pdHMpIHtcbiAgICAgIGNvbnN0IHBhcnRzID0gdW5pdHNbaW5kZXhdLnNwbGl0KCctJylcbiAgICAgIGNvbnN0IHVuaXROYW1lID0gcGFydHNbMF1cbiAgICAgIGNvbnN0IHByZWNpc2lvbiA9IHBhcnRzWzFdXG4gICAgICBjb25zdCB1bml0ID0gUGFyc2VyLmdldFVuaXRCeUxhYmVsKHVuaXROYW1lKVxuICAgICAgY29uc3Qgc2VnbWVudCA9IHsgdW5pdCB9XG4gICAgICBjb25zdCBsYXN0VW5pdCA9IHVuaXRzLmxlbmd0aCA9PT0gcGFyc2VJbnQoaW5kZXgsIDEwKSArIDFcbiAgICAgIGxldCByZW1haW5kZXIgPSAwXG5cbiAgICAgIGlmICghdW5pdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1lYXN1cmVzOjpDb252ZXJ0ZXIgY2Fubm90IGNvbnZlcnQgdG8gdW5rbm93biB1bml0ICR7dW5pdE5hbWV9YClcbiAgICAgIH1cblxuICAgICAgaWYgKHVuaXROYW1lICE9PSBjdXJyZW50VW5pdE5hbWUpIHtcbiAgICAgICAgdmFsdWUgPSBDb252ZXJ0ZXIuX2NvbnZlcnQodmFsdWUsIGN1cnJlbnRVbml0TmFtZSwgdW5pdE5hbWUpXG4gICAgICB9XG5cbiAgICAgIGlmICghbGFzdFVuaXQpIHtcbiAgICAgICAgc2VnbWVudC52YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gICAgICAgIHJlbWFpbmRlciA9IHZhbHVlIC0gc2VnbWVudC52YWx1ZVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNlZ21lbnQudmFsdWUgPSB2YWx1ZVxuICAgICAgICByZW1haW5kZXIgPSAwXG4gICAgICB9XG5cbiAgICAgIGlmIChwcmVjaXNpb24pIHtcbiAgICAgICAgc2VnbWVudC5wcmVjaXNpb24gPSBwcmVjaXNpb25cbiAgICAgICAgaWYgKHByZWNpc2lvbi5jaGFyQXQoJzAnKSA9PT0gJy8nKSB7XG4gICAgICAgICAgc2VnbWVudC5pc0ZyYWN0aW9uYWwgPSB0cnVlXG4gICAgICAgICAgc2VnbWVudC5wcmVjaXNpb24gPSBwcmVjaXNpb24uc3Vic3RyaW5nKDEpXG5cbiAgICAgICAgICBjb25zdCBpbnRlZ2VyUGFydCA9IE1hdGguZmxvb3Ioc2VnbWVudC52YWx1ZSlcbiAgICAgICAgICBjb25zdCBkZWNpbWFsUGFydCA9IHNlZ21lbnQudmFsdWUgLSBpbnRlZ2VyUGFydFxuICAgICAgICAgIGNvbnN0IHBhcnRzID0gW11cblxuICAgICAgICAgIGlmIChpbnRlZ2VyUGFydCkge1xuICAgICAgICAgICAgcGFydHMucHVzaChpbnRlZ2VyUGFydClcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRlY2ltYWxQYXJ0KSB7XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKEZyYWN0aW9uZXIuY2xvc2VzdChkZWNpbWFsUGFydCkuZnJhY3Rpb24pXG4gICAgICAgICAgICByZW1haW5kZXIgPSAwXG4gICAgICAgICAgfVxuICAgICAgICAgIHNlZ21lbnQuZm9ybWF0dGVkVmFsdWUgPSBwYXJ0cy5qb2luKCcgJylcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwcmVjaXNpb24gPT09ICdyb3VuZCcpIHtcbiAgICAgICAgICBzZWdtZW50LmZvcm1hdHRlZFZhbHVlID0gTWF0aC5yb3VuZChzZWdtZW50LnZhbHVlKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHByZWNpc2lvbiA9PT0gJ2Zsb29yJyB8fCBwcmVjaXNpb24gPT09ICcwJykge1xuICAgICAgICAgIHNlZ21lbnQuZm9ybWF0dGVkVmFsdWUgPSBNYXRoLmZsb29yKHNlZ21lbnQudmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocHJlY2lzaW9uID09PSAnY2VpbCcpIHtcbiAgICAgICAgICBzZWdtZW50LmZvcm1hdHRlZFZhbHVlID0gTWF0aC5jZWlsKHNlZ21lbnQudmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc2VnbWVudC5mb3JtYXR0ZWRWYWx1ZSA9IHNlZ21lbnQudmFsdWUudG9QcmVjaXNpb24ocHJlY2lzaW9uKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc2VnbWVudC5mb3JtYXR0ZWRWYWx1ZSA9IHNlZ21lbnQudmFsdWVcbiAgICAgIH1cbiAgICAgIHNlZ21lbnQuZm9ybWF0dGVkVmFsdWUgKz0gdW5pdC5sYWJlbFxuXG4gICAgICByZXN1bHQucHVzaChzZWdtZW50KVxuXG4gICAgICBjdXJyZW50VW5pdE5hbWUgPSB1bml0TmFtZVxuICAgICAgdmFsdWUgPSByZW1haW5kZXJcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cbiIsImNvbnN0IFBhcnNlciA9IHJlcXVpcmUoJy4vcGFyc2VyJylcbmNvbnN0IENvbnZlcnRlciA9IHJlcXVpcmUoJy4vY29udmVydGVyJylcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBNZWFzdXJlcyB7XG4gIGZyb20oc3RyaW5nKSB7XG4gICAgdGhpcy5zZWdtZW50cyA9IG5ldyBQYXJzZXIoKS5wYXJzZShzdHJpbmcpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHRvKHVuaXRzKSB7XG4gICAgY29uc3Qgc2VnbWVudHMgPSBuZXcgQ29udmVydGVyKHRoaXMuc2VnbWVudHMpLmNvbnZlcnQodW5pdHMpXG4gICAgcmV0dXJuIHNlZ21lbnRzLm1hcChzID0+IHMuZm9ybWF0dGVkVmFsdWUpLmpvaW4oJyAnKVxuICB9XG59XG4iXSwibmFtZXMiOlsiZnJhY3Rpb24iLCJ0cmltIiwicGFydHMiLCJzcGxpdCIsImxlbmd0aCIsIkVycm9yIiwicmVzdWx0IiwiRnJhY3Rpb25lciIsInBhcnNlTnVtYmVyIiwiaXNOYU4iLCJudW1iZXIiLCJyZXBsYWNlIiwicGFyc2VGbG9hdCIsInZhbHVlIiwicHJlY2lzaW9uIiwiZnJhY3Rpb25zIiwiRlJBQ1RJT05TIiwidmFsaWRQcmVjaXNpb25zIiwiaW5kZXhPZiIsImZpbHRlciIsImYiLCJ0b3BNYXRjaCIsImJvdHRvbU1hdGNoIiwicHJldmlvdXNGcmFjdGlvbiIsImZvckVhY2giLCJNYXRoIiwiYWJzIiwibGFiZWwiLCJQYXJzZXIiLCJVTklUUyIsImZpbmQiLCJ1IiwiTUVURVIiLCJLSUxPTUVURVIiLCJDRU5USU1FVEVSIiwiTUlMTElNRVRFUiIsIkZPT1QiLCJJTkNIIiwiTUlMRSIsIllBUkQiLCJzZWdtZW50cyIsInN0cmluZyIsIl9ub3JtYWxpemUiLCJzZWdtZW50IiwidW5pdCIsInVuaXRSZWdleCIsImV4ZWMiLCJfcGFyc2VOdW1iZXIiLCJmcmFjdGlvblJlZ2V4IiwicHVzaCIsInBhcnNlIiwiU3RyaW5nIiwiaXNGcmFjdGlvbmFsIiwidG9Mb3dlckNhc2UiLCJmcm9tVW5pdCIsInRvVW5pdCIsImdldFVuaXRCeUxhYmVsIiwiQ29udmVydGVyIiwiQ09OVkVSU0lPTlMiLCJuYW1lIiwiQXJyYXkiLCJpc0FycmF5IiwidW5pdE5hbWUiLCJ0b3RhbCIsIl9jb252ZXJ0IiwidW5pdHMiLCJjdXJyZW50VW5pdE5hbWUiLCJzdW0iLCJpbmRleCIsImxhc3RVbml0IiwicGFyc2VJbnQiLCJyZW1haW5kZXIiLCJmbG9vciIsImNoYXJBdCIsInN1YnN0cmluZyIsImludGVnZXJQYXJ0IiwiZGVjaW1hbFBhcnQiLCJjbG9zZXN0IiwiZm9ybWF0dGVkVmFsdWUiLCJqb2luIiwicm91bmQiLCJjZWlsIiwidG9QcmVjaXNpb24iLCJjb252ZXJ0IiwibWFwIiwicyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OzswQkFxRGVBLFVBQVU7aUJBQ1ZBLFNBQVNDLElBQVQsRUFBWDtVQUNNQyxRQUFRRixTQUFTRyxLQUFULENBQWUsR0FBZixDQUFkOztVQUVJRCxNQUFNRSxNQUFOLEtBQWlCLENBQXJCLEVBQXdCO2NBQ2hCLElBQUlDLEtBQUosMkJBQWtDTCxRQUFsQywrQkFBTjs7O1VBR0lNLFNBQVNDLFdBQVdDLFdBQVgsQ0FBdUJOLE1BQU0sQ0FBTixDQUF2QixJQUFtQ0ssV0FBV0MsV0FBWCxDQUF1Qk4sTUFBTSxDQUFOLENBQXZCLENBQWxEOztVQUVJTyxNQUFNSCxNQUFOLENBQUosRUFBbUI7Y0FDWCxJQUFJRCxLQUFKLDJDQUFrREwsUUFBbEQscUJBQU47OzthQUdLTSxNQUFQOzs7O2dDQUdpQkksUUFBUTtlQUNoQkEsT0FBT0MsT0FBUCxDQUFlLFdBQWYsRUFBNEIsRUFBNUIsQ0FBVDthQUNPQyxXQUFXRixNQUFYLEVBQW1CLEVBQW5CLENBQVA7Ozs7NEJBR2FHLE9BQU9DLFdBQVc7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
