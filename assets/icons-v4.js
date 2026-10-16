(() => {
  'use strict';

  const cache = new Map();

  function removeExteriorBlack(frame, width, height) {
    const pixels = frame.data;
    const count = width * height;
    const exterior = new Uint8Array(count);
    const queue = new Uint32Array(count);
    let read = 0;
    let write = 0;

    function add(index) {
      if (exterior[index]) return;
      const at = index * 4;
      if (Math.max(pixels[at], pixels[at + 1], pixels[at + 2]) > 64) return;
      exterior[index] = 1;
      queue[write++] = index;
    }

    for (let x = 0; x < width; x++) {
      add(x);
      add((height - 1) * width + x);
    }
    for (let y = 1; y < height - 1; y++) {
      add(y * width);
      add(y * width + width - 1);
    }
    while (read < write) {
      const index = queue[read++];
      const x = index % width;
      if (x > 0) add(index - 1);
      if (x < width - 1) add(index + 1);
      if (index >= width) add(index - width);
      if (index + width < count) add(index + width);
    }

    // Preserve enclosed black artwork, including the ARX Core lock.
    // Represent only the exterior background and glow using transparency.
    for (let index = 0; index < count; index++) {
      if (!exterior[index]) continue;
      const at = index * 4;
      const maximum = Math.max(pixels[at], pixels[at + 1], pixels[at + 2]);
      if (!maximum) {
        pixels[at + 3] = 0;
        continue;
      }
      pixels[at] = Math.round(pixels[at] * 255 / maximum);
      pixels[at + 1] = Math.round(pixels[at + 1] * 255 / maximum);
      pixels[at + 2] = Math.round(pixels[at + 2] * 255 / maximum);
      pixels[at + 3] = maximum;
    }
    return frame;
  }

  function loadArtwork(source) {
    if (cache.has(source)) return cache.get(source);
    const task = new Promise((resolve, reject) => {
      const original = new Image();
      original.onload = () => {
        try {
          const width = original.naturalWidth;
          const height = original.naturalHeight;
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (!ctx) throw new Error('Canvas unavailable');
          ctx.drawImage(original, 0, 0);
          const frame = ctx.getImageData(0, 0, width, height);
          ctx.putImageData(removeExteriorBlack(frame, width, height), 0, 0);
          resolve(canvas);
        } catch (error) {
          reject(error);
        }
      };
      original.onerror = () => reject(new Error('Icon unavailable'));
      original.src = source;
    });
    cache.set(source, task);
    return task;
  }

  document.querySelectorAll('img[data-transparent-icon]').forEach(image => {
    loadArtwork(image.currentSrc || image.src).then(artwork => {
      if (!image.isConnected) return;
      const canvas = document.createElement('canvas');
      canvas.width = artwork.width;
      canvas.height = artwork.height;
      canvas.className = image.className;
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', image.alt);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(artwork, 0, 0);
      image.replaceWith(canvas);
    }).catch(() => {
      // Keep the original image as a fallback if processing is unavailable.
    });
  });
})();
