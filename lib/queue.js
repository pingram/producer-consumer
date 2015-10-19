'use strict';

var _queue = [];

function Queue () {};

Queue.prototype.length = function () {
  return _queue.length;
};

Queue.prototype.enqueue = function (data) {
  _queue.push(data);
};

Queue.prototype.dequeue = function () {
  return _queue.shift();
};

Queue.prototype.clear = function () {
  _queue = [];
};

module.exports = new Queue();
