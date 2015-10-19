'use strict';

var net       = require('net');
var config    = require('../config');
var logger    = require('../lib/logger');
var consumer  = require('../consumer');

var socket, consumer, logger;

describe('consumer', function () {
  beforeEach(function (done) {
    socket  = new net.Socket();

    socket.connect(config.consumerPort, config.consumerHost, function () {
      socket.write('3 + 6', 'utf8');
    });

    socket.on('data', function () {
      done();
    });

    spyOn(logger, 'info')
  });

  afterEach(function () {
    socket.destroy();
  });

  it('logs received messages', function (done) {
    expect(logger.info).toHaveBeenCalledWith('Message received: ', '3 + 6');
    done();
  });

  it('correctly calculates expression then logs sent messages', function (done) {
    expect(logger.info).toHaveBeenCalledWith('Message sent: ', '3 + 6 = 9');
    done();
  });
});
