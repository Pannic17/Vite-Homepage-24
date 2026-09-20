import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chooseQuality, lowerQuality, createPerformanceMonitor} from '../../src/three/quality.js';

test('motion and data preferences override hardware; missing hints are conservative', () => {
  assert.equal(chooseQuality(), 'medium');
  assert.equal(chooseQuality({reducedMotion:true, cores:16, memory:16}), 'static');
  assert.equal(chooseQuality({saveData:true}), 'static');
  assert.equal(chooseQuality({cores:2, memory:8}), 'low');
  assert.equal(chooseQuality({cores:8, memory:8}), 'high');
  assert.equal(lowerQuality('low'), 'static');
});

test('sustained poor frames degrade only after warmup and reset on pause', () => {
  const changes = [];
  const monitor = createPerformanceMonitor('medium', level => changes.push(level));
  for (let time = 0; time <= 10000; time += 100) monitor.frame(time);
  assert.deepEqual(changes, []);
  for (let time = 10100; time <= 15000; time += 100) monitor.frame(time);
  assert.deepEqual(changes, ['low']);
  monitor.reset();
  for (let time = 30000; time <= 40000; time += 100) monitor.frame(time);
  assert.deepEqual(changes, ['low']);
});

test('healthy frames do not degrade', () => {
  const monitor = createPerformanceMonitor('medium', () => assert.fail('unexpected downgrade'));
  for (let time = 0; time <= 25000; time += 33.34) monitor.frame(time);
});
