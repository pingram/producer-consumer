'use strict';

var moment = require('moment');

module.exports = {
  info: function() {
    var args = Array.prototype.slice.call(arguments);
    console.log(formattedDate(), ' ', args.join(''));
    return;
  }
};

var formattedDate = function () {
  return moment(new Date()).format('MM/DD/YYYY HH:mm:ss');
};
