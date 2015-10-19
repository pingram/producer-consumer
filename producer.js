'use strict';

var net         = require('net');
var config      = require('./config');
var calculator  = require('./lib/calculator');
var logger      = require('./lib/logger');

var socket = new net.Socket();

socket.connect(config.consumerPort, config.consumerHost, function () {
  setInterval(function () {
    var expression = calculator.generate();
    socket.write(expression, 'utf8');
    logger.info('Message sent: ', expression);

  }, config.generatorFrequency);

  socket.on('data', function(data) {
    logger.info('Message received: ', data.toString());
  });

  socket.on('error', function(error){
    logger.info(error);
  });

  logger.info('Generator started');
});
