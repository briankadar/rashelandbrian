// Keep of cache of images that are loaded.
const _imgCache = {};

const _setCache = (url, img) => {
  _imgCache[url] = img;
};

export default function loadImage(url) {
  return new Promise(resolve => {
    if (_imgCache[url]) {
      resolve(_imgCache[url]);
      return;
    }

    const img = new Image();
    img.addEventListener('load', () => {
      _setCache(url, img);
      resolve(img);
    });

    img.src = url;
    if (img.loaded) {
      _setCache(url, img);
      resolve(img);
    }
  });
}
