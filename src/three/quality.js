export const qualityLevels = {
  static: {dpr: 0, fps: 0, effects: 0},
  low: {dpr: .75, fps: 30, effects: 0},
  medium: {dpr: 1, fps: 30, effects: 2},
  high: {dpr: 1.5, fps: 60, effects: 8},
};

export function chooseQuality({reducedMotion = false, saveData = false, cores = 4, memory = 4} = {}) {
  if (reducedMotion || saveData) return 'static';
  if (cores <= 2 || memory <= 2) return 'low';
  return cores >= 8 && memory >= 8 ? 'high' : 'medium';
}

export const lowerQuality = level => ({high:'medium', medium:'low', low:'static', static:'static'}[level]);

// Ignore initial shader compilation, then require two slow 5s windows.
// Downgrades only: no oscillation or repeated attempts on a struggling device.
export function createPerformanceMonitor(level, onSlow) {
  let start, count = 0, slowWindows = 0, warming = true;
  return {
    reset() { start = undefined; count = 0; slowWindows = 0; warming = true; },
    frame(time) {
      if (start === undefined) start = time;
      count++;
      const elapsed = time - start;
      if (elapsed < 5000) return;
      const fps = (count - 1) * 1000 / elapsed;
      if (!warming) {
        slowWindows = fps < qualityLevels[level].fps * .72 ? slowWindows + 1 : 0;
        if (slowWindows >= 2) { onSlow(lowerQuality(level)); slowWindows = 0; }
      }
      warming = false;
      start = time;
      count = 0;
    },
  };
}
