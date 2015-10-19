'use strict';

var net         = require('net');
var config      = require('./config');
var queue       = require('./lib/queue');
var logger      = require('./lib/logger');
var calculator  = require('./lib/calculator');

var clients = [];

var server = module.exports = net.createServer(function(socket) {

  clients.push(socket);

  setInterval(function () {
    if (queue.length() > 0) {
      processJob();
    }
  }, config.consumerFrequency);

  socket.on('data', function (data) {
    var message = data.toString()
    logger.info('Message received: ', message);
    queue.enqueue(message);
  });

  socket.on('end', function () {
    logger.info('Client disconnected');
    clients.splice(clients.indexOf(socket), 1);
  });

  function processJob () {
    var expression, result, message;

    expression = queue.dequeue();

    result  = calculator.calculate(expression);
    message = expression + ' = ' + result;

    notify(message);

    logger.info('Message sent: ', message);
  };

  function notify (message) {
    clients.forEach(function (client) {
      client.write(message, 'utf8');
    });
  };

});

server.listen(config.consumerPort, config.consumerHost);

logger.info('Consumer started on port ' + config.consumerPort);
