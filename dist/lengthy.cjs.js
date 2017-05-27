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
        throw new Error('Lengthy::Fractioner ' + fraction + ' is not a valid fraction.');
      }

      var result = Fractioner.parseNumber(parts[0]) / Fractioner.parseNumber(parts[1]);

      if (isNaN(result)) {
        throw new Error('Lengthy::Fractioner could not parse ' + fraction + ' into a number.');
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
        throw new Error('\n        Lengthy::Fractioner::closest() expect a value that is exclusively\n        between 0 and 1 as an argument.\n      ');
      }

      var fractions = Fractioner.FRACTIONS;

      if (precision) {
        var validPrecisions = [2, 4, 8, 16, 32, 64];
        if (validPrecisions.indexOf(precision) < 0) {
          throw new Error('\n          Lengthy::Fractioner::closest() precision must be in ' + validPrecisions + '.\n        ');
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
        throw new Error('\n        Lengthy::Parser constructor() expect a string as an argument.\n        Received ' + string + '\n      ');
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
        throw new Error('\n        Lengthy::Parser could not guess unit of ' + string + '.\n        Please pass the unit explicitly via the "unit" option.\n      ');
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
        throw new Error('\n        Lengthy::Parser could not parse value of ' + number + '.\n        Please pass the unit explicitly via the "unit" option.\n      ');
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
    key: 'convert',
    value: function convert(value, fromUnit, toUnit) {
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
      throw new Error('\n        Lengthy::Converter constructor() expect an array of segments as an argument.\n        Received ' + segments + '\n      ');
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
        throw new Error('\n        Lengthy::Converter cannot sum() with the unit ' + unitName + '\n      ');
      }

      var total = 0;
      this.segments.forEach(function (segment) {
        total += Converter.convert(segment.value, segment.unit.name, unit.name);
      });
      return total;
    }
  }, {
    key: 'format',
    value: function format(units) {
      if (!Array.isArray(units)) {
        units = [units];
      }

      var currentUnitName = units[0];
      var value = this.sum(currentUnitName);
      var result = [];

      for (var index in units) {
        var unitName = units[index];
        var unit = parser.getUnitByLabel(unitName);
        var segment = { unit: unit };
        var lastUnit = units.length === parseInt(index, 10) + 1;
        var remainder = 0;

        if (unitName !== currentUnitName) {
          value = Converter.convert(value, currentUnitName, unitName);
        }

        if (!lastUnit) {
          segment.value = Math.floor(value);
          remainder = value - segment.value;
        } else {
          segment.value = value;
        }

        result.push(segment);

        currentUnitName = unitName;
        value = remainder;
      }

      return result;
    }
  }]);
  return Converter;
}();

var lengthy = function () {
  function Lengthy() {
    classCallCheck(this, Lengthy);
  }

  createClass(Lengthy, [{
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
        return s.formattedValue + s.unit.label;
      }).join(' ');
    }
  }]);
  return Lengthy;
}();

module.exports = lengthy;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVuZ3RoeS5janMuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9mcmFjdGlvbmVyLmpzIiwiLi4vc3JjL3BhcnNlci5qcyIsIi4uL3NyYy9jb252ZXJ0ZXIuanMiLCIuLi9zcmMvbGVuZ3RoeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEZyYWN0aW9uZXIge1xuICBzdGF0aWMgZ2V0IEZSQUNUSU9OUygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgeyBmcmFjdGlvbjogJzEvNjQnLCBwcmVjaXNpb246IDY0LCB2YWx1ZTogMC4wMTU2MjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcxLzMyJywgcHJlY2lzaW9uOiAzMiwgdmFsdWU6IDAuMDMxMjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICczLzY0JywgcHJlY2lzaW9uOiA2NCwgdmFsdWU6IDAuMDQ2ODc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMS8xNicsIHByZWNpc2lvbjogMTYsIHZhbHVlOiAwLjA2MjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICc1LzY0JywgcHJlY2lzaW9uOiA2NCwgdmFsdWU6IDAuMDc4MTI1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMy8zMicsIHByZWNpc2lvbjogMzIsIHZhbHVlOiAwLjA5Mzc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnNy82NCcsIHByZWNpc2lvbjogNjQsIHZhbHVlOiAwLjEwOTM3NSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzEvOCcsIHByZWNpc2lvbjogOCwgdmFsdWU6IDAuMTI1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnOS82NCcsIHByZWNpc2lvbjogNjQsIHZhbHVlOiAwLjE0MDYyNSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzUvMzInLCBwcmVjaXNpb246IDMyLCB2YWx1ZTogMC4xNTYyNSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzExLzY0JywgcHJlY2lzaW9uOiA2NCwgdmFsdWU6IDAuMTcxODc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMy8xNicsIHByZWNpc2lvbjogMTYsIHZhbHVlOiAwLjE4NzUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcxMy82NCcsIHByZWNpc2lvbjogNjQsIHZhbHVlOiAwLjIwMzEyNSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzcvMzInLCBwcmVjaXNpb246IDMyLCB2YWx1ZTogMC4yMTg3NSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzE1LzY0JywgcHJlY2lzaW9uOiA2NCwgdmFsdWU6IDAuMjM0Mzc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMS80JywgcHJlY2lzaW9uOiA0LCB2YWx1ZTogMC4yNSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzE3LzY0JywgcHJlY2lzaW9uOiA2NCwgdmFsdWU6IDAuMjY1NjI1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnOS8zMicsIHByZWNpc2lvbjogMzIsIHZhbHVlOiAwLjI4MTI1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMTkvNjQnLCBwcmVjaXNpb246IDY0LCB2YWx1ZTogMC4yOTY4NzUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICc1LzE2JywgcHJlY2lzaW9uOiAxNiwgdmFsdWU6IDAuMzEyNSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzIxLzY0JywgcHJlY2lzaW9uOiA2NCwgdmFsdWU6IDAuMzI4MTI1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMTEvMzInLCBwcmVjaXNpb246IDMyLCB2YWx1ZTogMC4zNDM3NSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzIzLzY0JywgcHJlY2lzaW9uOiA2NCwgdmFsdWU6IDAuMzU5Mzc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMy84JywgcHJlY2lzaW9uOiA4LCB2YWx1ZTogMC4zNzUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcyNS82NCcsIHByZWNpc2lvbjogNjQsIHZhbHVlOiAwLjM5MDYyNSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzEzLzMyJywgcHJlY2lzaW9uOiAzMiwgdmFsdWU6IDAuNDA2MjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcyNy82NCcsIHByZWNpc2lvbjogNjQsIHZhbHVlOiAwLjQyMTg3NSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzcvMTYnLCBwcmVjaXNpb246IDE2LCB2YWx1ZTogMC40Mzc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMjkvNjQnLCBwcmVjaXNpb246IDY0LCB2YWx1ZTogMC40NTMxMjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcxNS8zMicsIHByZWNpc2lvbjogMzIsIHZhbHVlOiAwLjQ2ODc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMzEvNjQnLCBwcmVjaXNpb246IDY0LCB2YWx1ZTogMC40ODQzNzUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcxLzInLCBwcmVjaXNpb246IDIsIHZhbHVlOiAwLjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcxNy8zMicsIHByZWNpc2lvbjogMzIsIHZhbHVlOiAwLjUzMTI1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnOS8xNicsIHByZWNpc2lvbjogMTYsIHZhbHVlOiAwLjU2MjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcxOS8zMicsIHByZWNpc2lvbjogMzIsIHZhbHVlOiAwLjU5Mzc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnNS84JywgcHJlY2lzaW9uOiA4LCB2YWx1ZTogMC42MjUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcyMS8zMicsIHByZWNpc2lvbjogMzIsIHZhbHVlOiAwLjY1NjI1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMTEvMTYnLCBwcmVjaXNpb246IDE2LCB2YWx1ZTogMC42ODc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMjMvMzInLCBwcmVjaXNpb246IDMyLCB2YWx1ZTogMC43MTg3NSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzMvNCcsIHByZWNpc2lvbjogNCwgdmFsdWU6IDAuNzUgfSxcbiAgICAgIHsgZnJhY3Rpb246ICcyNS8zMicsIHByZWNpc2lvbjogMzIsIHZhbHVlOiAwLjc4MTI1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMTMvMTYnLCBwcmVjaXNpb246IDE2LCB2YWx1ZTogMC44MTI1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMjcvMzInLCBwcmVjaXNpb246IDMyLCB2YWx1ZTogMC44NDM3NSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzcvOCcsIHByZWNpc2lvbjogOCwgdmFsdWU6IDAuODc1IH0sXG4gICAgICB7IGZyYWN0aW9uOiAnMjkvMzInLCBwcmVjaXNpb246IDMyLCB2YWx1ZTogMC45MDYyNSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzE1LzE2JywgcHJlY2lzaW9uOiAxNiwgdmFsdWU6IDAuOTM3NSB9LFxuICAgICAgeyBmcmFjdGlvbjogJzMxLzMyJywgcHJlY2lzaW9uOiAzMiwgdmFsdWU6IDAuOTY4NzUgfVxuICAgIF1cbiAgfVxuXG4gIHN0YXRpYyBwYXJzZShmcmFjdGlvbikge1xuICAgIGZyYWN0aW9uID0gZnJhY3Rpb24udHJpbSgpXG4gICAgY29uc3QgcGFydHMgPSBmcmFjdGlvbi5zcGxpdCgnLycpXG5cbiAgICBpZiAocGFydHMubGVuZ3RoICE9PSAyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYExlbmd0aHk6OkZyYWN0aW9uZXIgJHtmcmFjdGlvbn0gaXMgbm90IGEgdmFsaWQgZnJhY3Rpb24uYClcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBGcmFjdGlvbmVyLnBhcnNlTnVtYmVyKHBhcnRzWzBdKSAvIEZyYWN0aW9uZXIucGFyc2VOdW1iZXIocGFydHNbMV0pXG5cbiAgICBpZiAoaXNOYU4ocmVzdWx0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBMZW5ndGh5OjpGcmFjdGlvbmVyIGNvdWxkIG5vdCBwYXJzZSAke2ZyYWN0aW9ufSBpbnRvIGEgbnVtYmVyLmApXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgc3RhdGljIHBhcnNlTnVtYmVyKG51bWJlcikge1xuICAgIG51bWJlciA9IG51bWJlci5yZXBsYWNlKC9bXlxcZFxcLl0vZ2ksICcnKVxuICAgIHJldHVybiBwYXJzZUZsb2F0KG51bWJlciwgMTApXG4gIH1cblxuICBzdGF0aWMgY2xvc2VzdCh2YWx1ZSwgcHJlY2lzaW9uKSB7XG4gICAgdmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlLCAxMClcblxuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPj0gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgICAgTGVuZ3RoeTo6RnJhY3Rpb25lcjo6Y2xvc2VzdCgpIGV4cGVjdCBhIHZhbHVlIHRoYXQgaXMgZXhjbHVzaXZlbHlcbiAgICAgICAgYmV0d2VlbiAwIGFuZCAxIGFzIGFuIGFyZ3VtZW50LlxuICAgICAgYClcbiAgICB9XG5cblxuICAgIGxldCBmcmFjdGlvbnMgPSBGcmFjdGlvbmVyLkZSQUNUSU9OU1xuXG4gICAgaWYgKHByZWNpc2lvbikge1xuICAgICAgY29uc3QgdmFsaWRQcmVjaXNpb25zID0gWzIsIDQsIDgsIDE2LCAzMiwgNjRdXG4gICAgICBpZiAodmFsaWRQcmVjaXNpb25zLmluZGV4T2YocHJlY2lzaW9uKSA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgICAgICBMZW5ndGh5OjpGcmFjdGlvbmVyOjpjbG9zZXN0KCkgcHJlY2lzaW9uIG11c3QgYmUgaW4gJHt2YWxpZFByZWNpc2lvbnN9LlxuICAgICAgICBgKVxuICAgICAgfVxuXG4gICAgICBmcmFjdGlvbnMgPSBmcmFjdGlvbnMuZmlsdGVyKGYgPT4gZi5wcmVjaXNpb24gPD0gcHJlY2lzaW9uKVxuICAgIH1cblxuICAgIGxldCB0b3BNYXRjaFxuICAgIGxldCBib3R0b21NYXRjaFxuICAgIGxldCBwcmV2aW91c0ZyYWN0aW9uXG5cbiAgICBmcmFjdGlvbnMuZm9yRWFjaChmID0+IHtcbiAgICAgIGlmICghdG9wTWF0Y2ggJiYgZi52YWx1ZSA+PSB2YWx1ZSkge1xuICAgICAgICB0b3BNYXRjaCA9IGZcbiAgICAgICAgYm90dG9tTWF0Y2ggPSBwcmV2aW91c0ZyYWN0aW9uXG4gICAgICB9XG4gICAgICBwcmV2aW91c0ZyYWN0aW9uID0gZlxuICAgIH0pXG5cbiAgICBpZiAoXG4gICAgICBib3R0b21NYXRjaCAmJlxuICAgICAgTWF0aC5hYnMoYm90dG9tTWF0Y2gudmFsdWUgLSB2YWx1ZSkgPCBNYXRoLmFicyh0b3BNYXRjaC52YWx1ZSAtIHZhbHVlKVxuICAgICkge1xuICAgICAgcmV0dXJuIGJvdHRvbU1hdGNoXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHRvcE1hdGNoXG4gICAgfVxuICB9XG59XG4iLCJjb25zdCBGcmFjdGlvbmVyID0gcmVxdWlyZSgnLi9mcmFjdGlvbmVyJylcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBQYXJzZXIge1xuICBzdGF0aWMgZ2V0IE1FVEVSKCkgeyByZXR1cm4gJ21ldGVyJyB9XG4gIHN0YXRpYyBnZXQgS0lMT01FVEVSKCkgeyByZXR1cm4gJ2tpbG9tZXRlcicgfVxuICBzdGF0aWMgZ2V0IENFTlRJTUVURVIoKSB7IHJldHVybiAnY2VudGltZXRlcicgfVxuICBzdGF0aWMgZ2V0IE1JTExJTUVURVIoKSB7IHJldHVybiAnbWlsbGltZXRlcicgfVxuICBzdGF0aWMgZ2V0IEZPT1QoKSB7IHJldHVybiAnZm9vdCcgfVxuICBzdGF0aWMgZ2V0IElOQ0goKSB7IHJldHVybiAnaW5jaCcgfVxuICBzdGF0aWMgZ2V0IE1JTEUoKSB7IHJldHVybiAnbWlsZScgfVxuICBzdGF0aWMgZ2V0IFlBUkQoKSB7IHJldHVybiAneWFyZCcgfVxuICBzdGF0aWMgZ2V0IHZhbGlkVW5pdHMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIFBhcnNlci5NRVRFUixcbiAgICAgIFBhcnNlci5LSUxPTUVURVIsXG4gICAgICBQYXJzZXIuQ0VOVElNRVRFUixcbiAgICAgIFBhcnNlci5NSUxMSU1FVEVSLFxuICAgICAgUGFyc2VyLkZPT1QsXG4gICAgICBQYXJzZXIuSU5DSCxcbiAgICAgIFBhcnNlci5NSUxFLFxuICAgICAgUGFyc2VyLllBUkRcbiAgICBdXG4gIH1cblxuICBzdGF0aWMgZ2V0IFVOSVRTKCkge1xuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnbScsXG4gICAgICAgIG5hbWU6IFBhcnNlci5NRVRFUlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICdtZXRlcicsXG4gICAgICAgIG5hbWU6IFBhcnNlci5NRVRFUlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICdtZXRlcnMnLFxuICAgICAgICBuYW1lOiBQYXJzZXIuTUVURVJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAna20nLFxuICAgICAgICBuYW1lOiBQYXJzZXIuS0lMT01FVEVSXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ2tpbG9tZXRlcicsXG4gICAgICAgIG5hbWU6IFBhcnNlci5LSUxPTUVURVJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAna2lsb21ldGVycycsXG4gICAgICAgIG5hbWU6IFBhcnNlci5LSUxPTUVURVJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnY20nLFxuICAgICAgICBuYW1lOiBQYXJzZXIuQ0VOVElNRVRFUlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICdjZW50aW1ldGVyJyxcbiAgICAgICAgbmFtZTogUGFyc2VyLkNFTlRJTUVURVJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnY2VudGltZXRlcnMnLFxuICAgICAgICBuYW1lOiBQYXJzZXIuQ0VOVElNRVRFUlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICdtbScsXG4gICAgICAgIG5hbWU6IFBhcnNlci5NSUxMSU1FVEVSXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ21pbGxpbWV0ZXInLFxuICAgICAgICBuYW1lOiBQYXJzZXIuTUlMTElNRVRFUlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICdtaWxsaW1ldGVycycsXG4gICAgICAgIG5hbWU6IFBhcnNlci5NSUxMSU1FVEVSXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ1xcJycsXG4gICAgICAgIG5hbWU6IFBhcnNlci5GT09UXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ2Z0JyxcbiAgICAgICAgbmFtZTogUGFyc2VyLkZPT1RcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnZm9vdCcsXG4gICAgICAgIG5hbWU6IFBhcnNlci5GT09UXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ2ZlZXQnLFxuICAgICAgICBuYW1lOiBQYXJzZXIuRk9PVFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICdcIicsXG4gICAgICAgIG5hbWU6IFBhcnNlci5JTkNIXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ2luJyxcbiAgICAgICAgbmFtZTogUGFyc2VyLklOQ0hcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnaW5jaCcsXG4gICAgICAgIG5hbWU6IFBhcnNlci5JTkNIXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ2luY2hlcycsXG4gICAgICAgIG5hbWU6IFBhcnNlci5JTkNIXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ21pJyxcbiAgICAgICAgbmFtZTogUGFyc2VyLk1JTEVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnbWlsZScsXG4gICAgICAgIG5hbWU6IFBhcnNlci5NSUxFXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ21pbGVzJyxcbiAgICAgICAgbmFtZTogUGFyc2VyLk1JTEVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAneWQnLFxuICAgICAgICBuYW1lOiBQYXJzZXIuWUFSRFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICd5YXJkJyxcbiAgICAgICAgbmFtZTogUGFyc2VyLllBUkRcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAneWFyZHMnLFxuICAgICAgICBuYW1lOiBQYXJzZXIuWUFSRFxuICAgICAgfSxcbiAgICBdXG4gIH1cblxuICBzdGF0aWMgZ2V0VW5pdEJ5TGFiZWwobGFiZWwpIHtcbiAgICByZXR1cm4gUGFyc2VyLlVOSVRTLmZpbmQodSA9PiB1LmxhYmVsID09PSBsYWJlbClcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2VnbWVudHMgPSBbXVxuICB9XG5cbiAgcGFyc2Uoc3RyaW5nKSB7XG4gICAgaWYgKCFzdHJpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXG4gICAgICAgIExlbmd0aHk6OlBhcnNlciBjb25zdHJ1Y3RvcigpIGV4cGVjdCBhIHN0cmluZyBhcyBhbiBhcmd1bWVudC5cbiAgICAgICAgUmVjZWl2ZWQgJHtzdHJpbmd9XG4gICAgICBgKVxuICAgIH1cblxuICAgIHRoaXMuc3RyaW5nID0gdGhpcy5fbm9ybWFsaXplKHN0cmluZylcbiAgICBsZXQgcmVzdWx0XG4gICAgbGV0IHNlZ21lbnRcbiAgICBsZXQgdW5pdFxuICAgIGxldCB2YWx1ZSA9IDBcblxuICAgIC8vIGNhcHR1cmVzIHNlZ21lbnQgd2l0aCB0aGUgdW5pdCBhdCB0aGUgZW5kOiA0Y20sIDEwIGttLCA0IDEvMlwiXG4gICAgY29uc3QgdW5pdFJlZ2V4ID0gLyhbXFxkXFxzXFwuXSspPyg/OlxccyooXFxkK1xcL1xcZCspKT9cXHMqKFteXFxkXFxzXFwvXSspJC9cbiAgICByZXN1bHQgPSB1bml0UmVnZXguZXhlYyhzdHJpbmcpXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgc2VnbWVudCA9IHJlc3VsdFswXVxuICAgICAgdW5pdCA9IFBhcnNlci5VTklUUy5maW5kKHUgPT4gdS5sYWJlbCA9PT0gcmVzdWx0WzNdKVxuICAgICAgdmFsdWUgKz0gdGhpcy5fcGFyc2VOdW1iZXIocmVzdWx0WzFdKVxuICAgICAgdmFsdWUgKz0gdGhpcy5fcGFyc2VOdW1iZXIocmVzdWx0WzJdKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIGNhcHR1cmVzIHNlZ21lbnQgd2l0aCB1bml0IGluIHRoZSBtaWRkbGU6IDRpbiAxLzJcbiAgICAgIGNvbnN0IGZyYWN0aW9uUmVnZXggPSAvKFtcXGRcXHNdKylcXHMqKFteXFxkXFxzXSspXFxzKyhcXGQrXFwvXFxkKykkL1xuICAgICAgcmVzdWx0ID0gZnJhY3Rpb25SZWdleC5leGVjKHN0cmluZylcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgc2VnbWVudCA9IHJlc3VsdFswXVxuICAgICAgICB1bml0ID0gUGFyc2VyLlVOSVRTLmZpbmQodSA9PiB1LmxhYmVsID09PSByZXN1bHRbMl0pXG4gICAgICAgIHZhbHVlID0gdGhpcy5fcGFyc2VOdW1iZXIocmVzdWx0WzFdKVxuICAgICAgICB2YWx1ZSArPSB0aGlzLl9wYXJzZU51bWJlcihyZXN1bHRbM10pXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF1bml0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFxuICAgICAgICBMZW5ndGh5OjpQYXJzZXIgY291bGQgbm90IGd1ZXNzIHVuaXQgb2YgJHtzdHJpbmd9LlxuICAgICAgICBQbGVhc2UgcGFzcyB0aGUgdW5pdCBleHBsaWNpdGx5IHZpYSB0aGUgXCJ1bml0XCIgb3B0aW9uLlxuICAgICAgYClcbiAgICB9XG5cbiAgICB0aGlzLnNlZ21lbnRzLnB1c2goe1xuICAgICAgZm9ybWF0dGVkVmFsdWU6IHRoaXMuX25vcm1hbGl6ZShzZWdtZW50LnJlcGxhY2UodW5pdC5sYWJlbCwgJycpKSxcbiAgICAgIGlzRnJhY3Rpb25hbDogc2VnbWVudC5pbmRleE9mKCcvJykgPiAtMSxcbiAgICAgIHNlZ21lbnQ6IHRoaXMuX25vcm1hbGl6ZShzZWdtZW50KSxcbiAgICAgIHVuaXQsXG4gICAgICB2YWx1ZVxuICAgIH0pXG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2Uoc2VnbWVudCwgJycpXG5cbiAgICBpZiAoc3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJzZShzdHJpbmcpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc2VnbWVudHNcbiAgICB9XG4gIH1cblxuICBfcGFyc2VOdW1iZXIobnVtYmVyKSB7XG4gICAgaWYgKCFudW1iZXIgfHwgIVN0cmluZyhudW1iZXIpLnRyaW0oKSkge1xuICAgICAgcmV0dXJuIDBcbiAgICB9XG4gICAgY29uc3QgaXNGcmFjdGlvbmFsID0gbnVtYmVyLmluZGV4T2YoJy8nKSA+IC0xXG4gICAgbGV0IHZhbHVlXG5cbiAgICBpZiAoaXNGcmFjdGlvbmFsKSB7XG4gICAgICB2YWx1ZSA9IEZyYWN0aW9uZXIucGFyc2UobnVtYmVyKVxuICAgIH1cbiAgICBlbHNlIGlmIChudW1iZXIpIHtcbiAgICAgIHZhbHVlID0gRnJhY3Rpb25lci5wYXJzZU51bWJlcihudW1iZXIpXG4gICAgfVxuXG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgICAgTGVuZ3RoeTo6UGFyc2VyIGNvdWxkIG5vdCBwYXJzZSB2YWx1ZSBvZiAke251bWJlcn0uXG4gICAgICAgIFBsZWFzZSBwYXNzIHRoZSB1bml0IGV4cGxpY2l0bHkgdmlhIHRoZSBcInVuaXRcIiBvcHRpb24uXG4gICAgICBgKVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgX25vcm1hbGl6ZShzdHJpbmcpIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZykudHJpbSgpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvICsvZywgJyAnKVxuICB9XG59XG4iLCJjb25zdCBQYXJzZXIgPSByZXF1aXJlKCcuL3BhcnNlci5qcycpXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgQ29udmVydGVyIHtcbiAgc3RhdGljIGdldCBDT05WRVJTSU9OUygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWlsbGltZXRlcjoge1xuICAgICAgICBtaWxsaW1ldGVyOiAxLFxuICAgICAgICBjZW50aW1ldGVyOiAuMSxcbiAgICAgICAgbWV0ZXI6IC4wMDEsXG4gICAgICAgIGtpbG9tZXRlcjogLjAwMDAwMSxcbiAgICAgICAgaW5jaDogLjAzOTM3MDA3ODc0MDE1N1x0LFxuICAgICAgICBmb290OiAuMDAzMjgwODM5ODk1MDEzMSxcbiAgICAgICAgeWFyZDogLjAwMTA5MzYxMzI5ODMzNzcsXG4gICAgICAgIG1pbGU6IC4wMDAwMDA2MjEzNzExOTIyMzczM1xuICAgICAgfSxcbiAgICAgIGNlbnRpbWV0ZXI6IHtcbiAgICAgICAgbWlsbGltZXRlcjogMTAsXG4gICAgICAgIGNlbnRpbWV0ZXI6IDEsXG4gICAgICAgIG1ldGVyOiAuMDEsXG4gICAgICAgIGtpbG9tZXRlcjogLjAwMDAxLFxuICAgICAgICBpbmNoOiAuMzkzNzAwNzg3NDAxNTcsXG4gICAgICAgIGZvb3Q6IC4wMzI4MDgzOTg5NTAxMzEsXG4gICAgICAgIHlhcmQ6IC4wMTA5MzYxMzI5ODMzNzcsXG4gICAgICAgIG1pbGU6IC4wMDAwMDYyMTM3MTE5MjIzNzMzXG4gICAgICB9LFxuICAgICAgbWV0ZXI6IHtcbiAgICAgICAgbWlsbGltZXRlcjogMTAwMCxcbiAgICAgICAgY2VudGltZXRlcjogMTAwLFxuICAgICAgICBtZXRlcjogMSxcbiAgICAgICAga2lsb21ldGVyOiAuMDAxLFxuICAgICAgICBpbmNoOiAzOS4zNzAwNzg3NDAxNTcsXG4gICAgICAgIGZvb3Q6IDMuMjgwODM5ODk1MDEzMSxcbiAgICAgICAgeWFyZDogMS4wOTM2MTMyOTgzMzc3LFxuICAgICAgICBtaWxlOiAuMDAwNjIxMzcxMTkyMjM3MzNcbiAgICAgIH0sXG4gICAgICBraWxvbWV0ZXI6IHtcbiAgICAgICAgbWlsbGltZXRlcjogMTAwMDAwMCxcbiAgICAgICAgY2VudGltZXRlcjogMTAwMDAwLFxuICAgICAgICBtZXRlcjogMTAwMCxcbiAgICAgICAga2lsb21ldGVyOiAxLFxuICAgICAgICBpbmNoOiAzOTM3MC4wNzg3NDAxNTcsXG4gICAgICAgIGZvb3Q6IDMyODAuODM5ODk1MDEzMSxcbiAgICAgICAgeWFyZDogMTA5My42MTMyOTgzMzc3LFxuICAgICAgICBtaWxlOiAuNjIxMzcxMTkyMjM3MzNcbiAgICAgIH0sXG4gICAgICBpbmNoOiB7XG4gICAgICAgIG1pbGxpbWV0ZXI6IDI1LjQsXG4gICAgICAgIGNlbnRpbWV0ZXI6IDIuNTQsXG4gICAgICAgIG1ldGVyOiAwLjAyNTQsXG4gICAgICAgIGtpbG9tZXRlcjogMC4wMDAwMjU0LFxuICAgICAgICBpbmNoOiAxLFxuICAgICAgICBmb290OiAwLjA4MzMzMzMzMzMzMzMzMyxcbiAgICAgICAgeWFyZDogMC4wMjc3Nzc3Nzc3Nzc3NzgsXG4gICAgICAgIG1pbGU6IDAuMDAwMDE1NzgyODI4MjgyODI4XG4gICAgICB9LFxuICAgICAgZm9vdDoge1xuICAgICAgICBtaWxsaW1ldGVyOiAzMDQuOCxcbiAgICAgICAgY2VudGltZXRlcjogMzAuNDgsXG4gICAgICAgIG1ldGVyOiAwLjMwNDgsXG4gICAgICAgIGtpbG9tZXRlcjogMC4wMDAzMDQ4LFxuICAgICAgICBpbmNoOiAxMixcbiAgICAgICAgZm9vdDogMSxcbiAgICAgICAgeWFyZDogMC4zMzMzMzMzMzMzMzMzMyxcbiAgICAgICAgbWlsZTogMC4wMDAxODkzOTM5MzkzOTM5NFxuICAgICAgfSxcbiAgICAgIHlhcmQ6IHtcbiAgICAgICAgbWlsbGltZXRlcjogOTE0LjQsXG4gICAgICAgIGNlbnRpbWV0ZXI6IDkxLjQ0LFxuICAgICAgICBtZXRlcjogMC45MTQ0LFxuICAgICAgICBraWxvbWV0ZXI6IDAuMDAwOTE0NCxcbiAgICAgICAgaW5jaDogMzYsXG4gICAgICAgIGZvb3Q6IDMsXG4gICAgICAgIHlhcmQ6IDEsXG4gICAgICAgIG1pbGU6IDAuMDAwNTY4MTgxODE4MTgxODJcbiAgICAgIH0sXG4gICAgICBtaWxlOiB7XG4gICAgICAgIG1pbGxpbWV0ZXI6IDE2MDkzNDQsXG4gICAgICAgIGNlbnRpbWV0ZXI6IDE2MDkzNC40LFxuICAgICAgICBtZXRlcjogMTYwOS4zNDQsXG4gICAgICAgIGtpbG9tZXRlcjogMS42MDkzNDQsXG4gICAgICAgIGluY2g6IDYzMzYwLFxuICAgICAgICBmb290OiA1MjgwLFxuICAgICAgICB5YXJkOiAxNzYwLFxuICAgICAgICBtaWxlOiAxXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNvbnZlcnQodmFsdWUsIGZyb21Vbml0LCB0b1VuaXQpIHtcbiAgICBpZiAodHlwZW9mIGZyb21Vbml0ID09PSAnc3RyaW5nJykge1xuICAgICAgZnJvbVVuaXQgPSBQYXJzZXIuZ2V0VW5pdEJ5TGFiZWwoZnJvbVVuaXQpXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0b1VuaXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0b1VuaXQgPSBQYXJzZXIuZ2V0VW5pdEJ5TGFiZWwodG9Vbml0KVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZSAqIENvbnZlcnRlci5DT05WRVJTSU9OU1tmcm9tVW5pdC5uYW1lXVt0b1VuaXQubmFtZV1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHNlZ21lbnRzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHNlZ21lbnRzKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgICAgTGVuZ3RoeTo6Q29udmVydGVyIGNvbnN0cnVjdG9yKCkgZXhwZWN0IGFuIGFycmF5IG9mIHNlZ21lbnRzIGFzIGFuIGFyZ3VtZW50LlxuICAgICAgICBSZWNlaXZlZCAke3NlZ21lbnRzfVxuICAgICAgYClcbiAgICB9XG5cbiAgICB0aGlzLnNlZ21lbnRzID0gc2VnbWVudHNcbiAgfVxuXG4gIHN1bSh1bml0TmFtZSkge1xuICAgIGxldCB1bml0XG5cbiAgICBpZiAodHlwZW9mIHVuaXROYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdW5pdCA9IHVuaXROYW1lXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdW5pdCA9IFBhcnNlci5nZXRVbml0QnlMYWJlbCh1bml0TmFtZSlcbiAgICB9XG5cbiAgICBpZiAoIXVuaXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXG4gICAgICAgIExlbmd0aHk6OkNvbnZlcnRlciBjYW5ub3Qgc3VtKCkgd2l0aCB0aGUgdW5pdCAke3VuaXROYW1lfVxuICAgICAgYClcbiAgICB9XG5cbiAgICBsZXQgdG90YWwgPSAwXG4gICAgdGhpcy5zZWdtZW50cy5mb3JFYWNoKHNlZ21lbnQgPT4ge1xuICAgICAgdG90YWwgKz0gQ29udmVydGVyLmNvbnZlcnQoc2VnbWVudC52YWx1ZSwgc2VnbWVudC51bml0Lm5hbWUsIHVuaXQubmFtZSlcbiAgICB9KVxuICAgIHJldHVybiB0b3RhbFxuICB9XG5cbiAgZm9ybWF0KHVuaXRzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHVuaXRzKSkge1xuICAgICAgdW5pdHMgPSBbdW5pdHNdXG4gICAgfVxuXG4gICAgbGV0IGN1cnJlbnRVbml0TmFtZSA9IHVuaXRzWzBdXG4gICAgbGV0IHZhbHVlID0gdGhpcy5zdW0oY3VycmVudFVuaXROYW1lKVxuICAgIGxldCByZXN1bHQgPSBbXVxuXG4gICAgZm9yIChsZXQgaW5kZXggaW4gdW5pdHMpIHtcbiAgICAgIGNvbnN0IHVuaXROYW1lID0gdW5pdHNbaW5kZXhdXG4gICAgICBjb25zdCB1bml0ID0gUGFyc2VyLmdldFVuaXRCeUxhYmVsKHVuaXROYW1lKVxuICAgICAgY29uc3Qgc2VnbWVudCA9IHsgdW5pdCB9XG4gICAgICBjb25zdCBsYXN0VW5pdCA9IHVuaXRzLmxlbmd0aCA9PT0gcGFyc2VJbnQoaW5kZXgsIDEwKSArIDFcbiAgICAgIGxldCByZW1haW5kZXIgPSAwXG5cbiAgICAgIGlmICh1bml0TmFtZSAhPT0gY3VycmVudFVuaXROYW1lKSB7XG4gICAgICAgIHZhbHVlID0gQ29udmVydGVyLmNvbnZlcnQodmFsdWUsIGN1cnJlbnRVbml0TmFtZSwgdW5pdE5hbWUpXG4gICAgICB9XG5cbiAgICAgIGlmICghbGFzdFVuaXQpIHtcbiAgICAgICAgc2VnbWVudC52YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gICAgICAgIHJlbWFpbmRlciA9IHZhbHVlIC0gc2VnbWVudC52YWx1ZVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNlZ21lbnQudmFsdWUgPSB2YWx1ZVxuICAgICAgfVxuXG4gICAgICByZXN1bHQucHVzaChzZWdtZW50KVxuXG4gICAgICBjdXJyZW50VW5pdE5hbWUgPSB1bml0TmFtZVxuICAgICAgdmFsdWUgPSByZW1haW5kZXJcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cbiIsImNvbnN0IFBhcnNlciA9IHJlcXVpcmUoJy4vcGFyc2VyJylcbmNvbnN0IENvbnZlcnRlciA9IHJlcXVpcmUoJy4vY29udmVydGVyJylcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBMZW5ndGh5IHtcbiAgZnJvbShzdHJpbmcpIHtcbiAgICB0aGlzLnNlZ21lbnRzID0gbmV3IFBhcnNlcigpLnBhcnNlKHN0cmluZylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdG8odW5pdHMpIHtcbiAgICBjb25zdCBzZWdtZW50cyA9IG5ldyBDb252ZXJ0ZXIodGhpcy5zZWdtZW50cykuY29udmVydCh1bml0cylcbiAgICByZXR1cm4gc2VnbWVudHMubWFwKHMgPT4gcy5mb3JtYXR0ZWRWYWx1ZSArIHMudW5pdC5sYWJlbCkuam9pbignICcpXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJmcmFjdGlvbiIsInRyaW0iLCJwYXJ0cyIsInNwbGl0IiwibGVuZ3RoIiwiRXJyb3IiLCJyZXN1bHQiLCJGcmFjdGlvbmVyIiwicGFyc2VOdW1iZXIiLCJpc05hTiIsIm51bWJlciIsInJlcGxhY2UiLCJwYXJzZUZsb2F0IiwidmFsdWUiLCJwcmVjaXNpb24iLCJmcmFjdGlvbnMiLCJGUkFDVElPTlMiLCJ2YWxpZFByZWNpc2lvbnMiLCJpbmRleE9mIiwiZmlsdGVyIiwiZiIsInRvcE1hdGNoIiwiYm90dG9tTWF0Y2giLCJwcmV2aW91c0ZyYWN0aW9uIiwiZm9yRWFjaCIsIk1hdGgiLCJhYnMiLCJsYWJlbCIsIlBhcnNlciIsIlVOSVRTIiwiZmluZCIsInUiLCJNRVRFUiIsIktJTE9NRVRFUiIsIkNFTlRJTUVURVIiLCJNSUxMSU1FVEVSIiwiRk9PVCIsIklOQ0giLCJNSUxFIiwiWUFSRCIsInNlZ21lbnRzIiwic3RyaW5nIiwiX25vcm1hbGl6ZSIsInNlZ21lbnQiLCJ1bml0IiwidW5pdFJlZ2V4IiwiZXhlYyIsIl9wYXJzZU51bWJlciIsImZyYWN0aW9uUmVnZXgiLCJwdXNoIiwicGFyc2UiLCJTdHJpbmciLCJpc0ZyYWN0aW9uYWwiLCJ0b0xvd2VyQ2FzZSIsImZyb21Vbml0IiwidG9Vbml0IiwiZ2V0VW5pdEJ5TGFiZWwiLCJDb252ZXJ0ZXIiLCJDT05WRVJTSU9OUyIsIm5hbWUiLCJBcnJheSIsImlzQXJyYXkiLCJ1bml0TmFtZSIsInRvdGFsIiwiY29udmVydCIsInVuaXRzIiwiY3VycmVudFVuaXROYW1lIiwic3VtIiwiaW5kZXgiLCJsYXN0VW5pdCIsInBhcnNlSW50IiwicmVtYWluZGVyIiwiZmxvb3IiLCJtYXAiLCJzIiwiZm9ybWF0dGVkVmFsdWUiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7OzBCQXFEZUEsVUFBVTtpQkFDVkEsU0FBU0MsSUFBVCxFQUFYO1VBQ01DLFFBQVFGLFNBQVNHLEtBQVQsQ0FBZSxHQUFmLENBQWQ7O1VBRUlELE1BQU1FLE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7Y0FDaEIsSUFBSUMsS0FBSiwwQkFBaUNMLFFBQWpDLCtCQUFOOzs7VUFHSU0sU0FBU0MsV0FBV0MsV0FBWCxDQUF1Qk4sTUFBTSxDQUFOLENBQXZCLElBQW1DSyxXQUFXQyxXQUFYLENBQXVCTixNQUFNLENBQU4sQ0FBdkIsQ0FB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
