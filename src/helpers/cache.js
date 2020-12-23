const fileNames = [
  "1c.svg",
  "1d.svg",
  "1h.svg",
  "1s.svg",
  "2c.svg",
  "2d.svg",
  "2h.svg",
  "2s.svg",
  "3c.svg",
  "3d.svg",
  "3h.svg",
  "3s.svg",
  "4c.svg",
  "4d.svg",
  "4h.svg",
  "4s.svg",
  "5c.svg",
  "5d.svg",
  "5h.svg",
  "5s.svg",
  "6c.svg",
  "6d.svg",
  "6h.svg",
  "6s.svg",
  "7c.svg",
  "7d.svg",
  "7h.svg",
  "7s.svg",
  "8c.svg",
  "8d.svg",
  "8h.svg",
  "8s.svg",
  "9c.svg",
  "9d.svg",
  "9h.svg",
  "9s.svg",
  "10c.svg",
  "10d.svg",
  "10h.svg",
  "10s.svg",
  "11c.svg",
  "11d.svg",
  "11h.svg",
  "11s.svg",
  "12c.svg",
  "12d.svg",
  "12h.svg",
  "12s.svg",
  "13c.svg",
  "13d.svg",
  "13h.svg",
  "13s.svg",
];

function generateListOfSources(path, quantity) {}

export async function cacheImages(arrayOfImageSources) {
  const promises = await arrayOfImageSources.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve();
      img.onerror = reject();
    });
  });

  // Wait for all promises to get done
  return await Promise.all(promises);
}

function cacheAudio() {}
