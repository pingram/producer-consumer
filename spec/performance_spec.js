'use strict';

var net       = require('net');
var config    = require('../config');
var logger    = require('../lib/logger');
var consumer  = require('../consumer');

var socket1, socket2, consumer, logger, startTime, endTime, elapsedTime, receivedData1, receivedData2;

describe('consumer', function () {
  beforeEach(function (done) {

    receivedData1 = false;
    receivedData2 = false;

    socket1   = new net.Socket();
    socket2   = new net.Socket();
    startTime = new Date();

    socket1.connect(config.consumerPort, config.consumerHost, function () {
      socket1.write('3 + 6', 'utf8');
    });

    socket2.connect(config.consumerPort, config.consumerHost, function () {
      socket2.write('8 * 4', 'utf8');
    });

    socket1.on('data', function () {
      receivedData1 = true;
      checkIfDone(done);
    });

    socket2.on('data', function () {
      receivedData2 = true;
      checkIfDone(done);
    });

    spyOn(logger, 'info');
  });


  afterEach(function () {
    socket1.destroy();
    socket2.destroy();
  });

  it('processes more than 2 req/sec', function () {
    endTime         = new Date();
    elapsedTime = endTime - startTime; // milliseconds

    expect(elapsedTime).toBeLessThan(1000);
  });
});

// check that both socket1 and socket2 received data before done
function checkIfDone (done) {
  if (receivedData1 && receivedData2) {
    done();
  }
  return true;
};
