// Frame Sequence Manager for AL NOBLE AMEER (720 frames)
// Ultra-smooth, high-performance static cache with scroll-priority lookahead

const TOTAL_FRAMES = 720;

// High-performance static URLs from public/frames/
export const FRAME_URLS = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const pad = String(i + 1).padStart(4, '0');
  return `/frames/${pad}.jpg`;
});

// Primary image memory cache
const imageCache = new Array(TOTAL_FRAMES).fill(null);
const loadedSet = new Set();
const loadingPromises = new Map();

// Frame load listeners
const frameListeners = new Set();

export function subscribeToFrames(fn) {
  frameListeners.add(fn);
  if (imageCache[0] && imageCache[0].complete && imageCache[0].naturalWidth > 0) {
    try { fn(0); } catch (e) {}
  }
  return () => frameListeners.delete(fn);
}

function notifyListeners(frameIndex) {
  frameListeners.forEach((fn) => {
    try { fn(frameIndex); } catch (e) {}
  });
}

let isPreloadStarted = false;
let onProgressCallback = null;
let onReadyCallback = null;

// High priority queue for interactive scroll lookahead
const priorityQueue = [];
let activeWorkers = 0;
const MAX_CONCURRENT = 8;

/**
 * Loads a single frame into memory with deduplicated promise caching
 */
export function loadSingleFrame(index) {
  const target = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));

  if (imageCache[target] && imageCache[target].complete && imageCache[target].naturalWidth > 0) {
    return Promise.resolve(imageCache[target]);
  }

  if (loadingPromises.has(target)) {
    return loadingPromises.get(target);
  }

  const promise = new Promise((resolve) => {
    const img = new Image();
    // Hint browser to decode asynchronously
    if ('decoding' in img) {
      img.decoding = 'async';
    }

    let isSettled = false;

    const onComplete = () => {
      if (isSettled) return;
      isSettled = true;
      imageCache[target] = img;
      loadedSet.add(target);
      loadingPromises.delete(target);
      if (onProgressCallback) {
        onProgressCallback(loadedSet.size, TOTAL_FRAMES);
      }
      notifyListeners(target);
      resolve(img);
    };

    img.onload = onComplete;
    img.onerror = () => {
      if (isSettled) return;
      isSettled = true;
      loadingPromises.delete(target);
      resolve(null);
    };

    img.src = FRAME_URLS[target];

    // Browser cache instant hit
    if (img.complete && img.naturalWidth > 0) {
      onComplete();
    }
  });

  loadingPromises.set(target, promise);
  return promise;
}

/**
 * Scroll lookahead prefetcher:
 * Predicts and preloads the frames around the user's active scroll window with highest priority
 */
export function requestLookahead(currentIndex) {
  const center = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentIndex)));
  
  // High-priority window (+/- 20 frames around current position)
  for (let offset = 0; offset <= 20; offset++) {
    const fwd = center + offset;
    if (fwd < TOTAL_FRAMES && !loadedSet.has(fwd) && !loadingPromises.has(fwd)) {
      loadSingleFrame(fwd);
    }
    const bwd = center - offset;
    if (bwd >= 0 && !loadedSet.has(bwd) && !loadingPromises.has(bwd)) {
      loadSingleFrame(bwd);
    }
  }
}

/**
 * Map website scroll progress (0.0 to 1.0) to frame index:
 * Exact user specification:
 * - 0.00 – 0.28 (Hero & Act I): Frames 0 – 239 (0001.jpg - 0240.jpg)
 * - 0.28 – 0.60 (ss1 - Imperial Seal & Olfactory): Frames 480 – 719 (0481.jpg - 0720.jpg)
 * - 0.60 – 1.00 (ss2 - Atelier Monolith & Trilogy): Frames 240 – 479 (0241.jpg - 0480.jpg)
 */
export function mapProgressToFrameIndex(progress) {
  const p = Math.max(0, Math.min(1, progress));

  if (p < 0.28) {
    const norm = p / 0.28;
    return Math.min(239, Math.round(norm * 239));
  } else if (p < 0.60) {
    const norm = (p - 0.28) / (0.60 - 0.28);
    return Math.min(719, Math.round(480 + norm * (719 - 480)));
  } else {
    const norm = (p - 0.60) / (1.00 - 0.60);
    return Math.min(479, Math.round(240 + norm * (479 - 240)));
  }
}

/**
 * Returns which section (1, 2, or 3) a frame index belongs to
 */
export function getFrameSection(frameIndex) {
  if (frameIndex <= 239) return 1;       // Act I / Hero: 0-239
  if (frameIndex >= 480) return 2;       // ss1 Imperial Seal: 480-719
  return 3;                              // ss2 Atelier Monolith: 240-479
}

/**
 * Worker pool helper for parallel batch preloading
 */
async function runWorkerPool(indices, concurrency = MAX_CONCURRENT, onBatchProgress) {
  let currentIndex = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (currentIndex < indices.length) {
      const idx = indices[currentIndex++];
      await loadSingleFrame(idx);
      if (onBatchProgress) onBatchProgress();
    }
  });
  await Promise.all(workers);
}

/**
 * Initializes progressive preloading
 * Strategy:
 * 1. Immediate Pass: Frame 0, 240, 480, 719 (section anchors) + initial hero burst (0-50).
 * 2. Skeleton Pass: Every 4th frame (0, 4, 8, ... 716) across the entire sequence.
 *    Once this finishes (~180 images, ~1s over local HTTP), the user can scroll anywhere
 *    without missing a beat because the nearest frame is at most 2 frames away!
 * 3. Continuous Pass: Fill in remaining even and odd frames in the background.
 */
export function initImageSequence({ onProgress, onInitialReady }) {
  onProgressCallback = onProgress;
  onReadyCallback = onInitialReady;

  if (isPreloadStarted) {
    if (loadedSet.size >= 30 && onReadyCallback) {
      onReadyCallback();
    }
    return;
  }
  isPreloadStarted = true;

  // Step 1: Load section anchors first
  const sectionAnchors = [0, 240, 480, 719];
  Promise.all(sectionAnchors.map(loadSingleFrame)).then(() => {
    notifyListeners(0);

    // Step 2: Immediate Hero burst (0-50) + Full Timeline Skeleton (every 4th frame)
    const tier1Indices = [];
    
    // Smooth start for Hero
    for (let i = 1; i <= 50; i++) {
      tier1Indices.push(i);
    }
    
    // Full sequence skeleton (every 4th frame)
    for (let i = 0; i < TOTAL_FRAMES; i += 4) {
      if (!tier1Indices.includes(i)) {
        tier1Indices.push(i);
      }
    }

    let initialTriggered = false;
    let initialCount = 0;
    const readyThreshold = 45; // Ready in ~0.5s

    runWorkerPool(tier1Indices, MAX_CONCURRENT, () => {
      initialCount++;
      if (initialCount >= readyThreshold && !initialTriggered) {
        initialTriggered = true;
        if (onReadyCallback) onReadyCallback();
      }
    }).then(() => {
      if (!initialTriggered && onReadyCallback) {
        initialTriggered = true;
        onReadyCallback();
      }

      // Step 3: Tier 2 (every 2nd frame)
      const tier2Indices = [];
      for (let i = 2; i < TOTAL_FRAMES; i += 4) {
        if (!loadedSet.has(i)) tier2Indices.push(i);
      }

      runWorkerPool(tier2Indices, 6).then(() => {
        // Step 4: Tier 3 (remaining odd frames)
        const remainingIndices = [];
        for (let i = 0; i < TOTAL_FRAMES; i++) {
          if (!loadedSet.has(i)) remainingIndices.push(i);
        }
        runWorkerPool(remainingIndices, 6);
      });
    });
  });
}

// Stores the last valid rendered image so canvas NEVER flickers
let lastServedFrame = null;

/**
 * Retrieves the best available frame for rendering.
 * Never stalls: returns exact target frame if ready, or closest cached neighbor.
 */
export function getFrame(index) {
  const target = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
  
  if (imageCache[target] && imageCache[target].complete && imageCache[target].naturalWidth > 0) {
    lastServedFrame = imageCache[target];
    return imageCache[target];
  }

  // Look for the closest loaded frame within small distance (+/- 12)
  for (let distance = 1; distance <= 12; distance++) {
    const prev = target - distance;
    if (prev >= 0 && imageCache[prev] && imageCache[prev].complete && imageCache[prev].naturalWidth > 0) {
      lastServedFrame = imageCache[prev];
      return imageCache[prev];
    }
    const next = target + distance;
    if (next < TOTAL_FRAMES && imageCache[next] && imageCache[next].complete && imageCache[next].naturalWidth > 0) {
      lastServedFrame = imageCache[next];
      return imageCache[next];
    }
  }

  // Section anchor fallbacks within the same section
  const section = getFrameSection(target);
  if (section === 2 && imageCache[480] && imageCache[480].complete) {
    return imageCache[480];
  }
  if (section === 3 && imageCache[240] && imageCache[240].complete) {
    return imageCache[240];
  }
  if (lastServedFrame) {
    return lastServedFrame;
  }
  if (imageCache[0] && imageCache[0].complete) {
    return imageCache[0];
  }

  return null;
}

export { TOTAL_FRAMES };
