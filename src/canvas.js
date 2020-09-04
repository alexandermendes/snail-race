/**
 * Get a full screen canvas.
 */
export const getCanvas = () => {
  const margin = 10;
  const canvas = document.createElement('canvas');

  canvas.style.display = 'block';
  canvas.style.position = 'fixed';
  canvas.style.pointerEvents = 'none';
  canvas.style.top = 0;
  canvas.style.margin = `${margin}px 0`
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - margin * 2;
  canvas.id = 'snail-canvas';

  document.querySelector('body').appendChild(canvas);

  return canvas;
};

/**
 * Reset any canvas transformations.
 */
export const resetCanvas = (canvas) => {
  const ctx = canvas.getContext('2d');

  ctx.resetTransform();
};

/**
 * Clear a canvas.
 */
export const clearCanvas = (canvas) => {
  const ctx = canvas.getContext('2d');

  resetCanvas(canvas);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
