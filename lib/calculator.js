'use strict';

var math = require ('mathjs');

var operators = [' + ', ' - ', ' * ', ' / '];

module.exports = {
  generate: function () {
    return randomInteger() + randomOperator() + randomInteger();
  },

  calculate: function (expression) {
    return Math.round(math.eval(expression) * 10) / 10;
  }
};

var randomInteger = function () {
  return Math.floor((Math.random() * 10) + 1);
};

var randomOperator = function () {
  var operator = operators[Math.floor(Math.random() * operators.length)];
  return operator;
};
