'use strict';

var calculator = require('../../lib/calculator');
var result, expression, regex, digits, parsedFloat, parsedInt;

describe('calculator', function () {
  describe('generate', function () {
    it('should generate a random expression', function () {
      expression = calculator.generate();
      // the regex matches digit operantor digit:
      regex = /\d+ (\*|\+|\/|-) \d+/;
      expect(expression).toMatch(regex);
    });

    it('should use integers in the expression', function () {
      expression = calculator.generate();
      // the regex matches integers and floats:
      regex = /\d+\.?[\d+]?/g
      digits = expression.match(regex);
      digits.forEach(function (digit) {
        parsedFloat = parseFloat(digit);
        parsedInt = parseInt(digit);
        expect(parsedFloat).toEqual(parsedInt);
      });
    });
  });

  describe('calculate', function () {
    it('should calculate the expression', function () {
      result = calculator.calculate('2 * 4');
      expect(result).toBe(8);
    });

    it('should round to the nearest 1 decimal point', function () {
      result = calculator.calculate('9 / 7');
      expect(result).toBe(1.3);
    });
  });
});
