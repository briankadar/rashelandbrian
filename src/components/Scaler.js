const Scaler = ({ viewportWidth, viewportHeight, width, height, children })  => {
  // http://blog.vjeux.com/2013/image/css-container-and-cover.html
  const viewportRatio = viewportWidth / viewportHeight;
  const contentRatio = width / height;
  let targetWidth, targetHeight;

  if (contentRatio <= viewportRatio) {
    targetWidth = viewportWidth;
    targetHeight = viewportWidth / contentRatio;
  } else {
    targetWidth = viewportHeight * contentRatio;
    targetHeight = viewportHeight;
  }

  return children({ width: targetWidth, height: targetHeight });
}

export default Scaler;
