'use strict';

var queue = require('../../lib/queue');

var dequeued;

describe('queue', function () {
  beforeEach(function () {
    queue.clear();
  });

  describe('enqueue', function () {
    it('should enqueue a string', function () {
      expect(queue.length()).toBe(0);
      queue.enqueue('asdf');
      expect(queue.length()).toBe(1);
    });
  });

  describe('dequeue', function () {
    it('should dequeue a string', function () {
      expect(queue.length()).toBe(0);
      queue.enqueue('asdf');
      expect(queue.length()).toBe(1);
      dequeued = queue.dequeue();
      expect(dequeued).toBe
      expect(queue.length()).toBe(0);
    });
  });
});
