export function checkVideoResolution(file, callback) {
  const video = document.querySelector(".check-resolution-video");
  var objectUrl = URL.createObjectURL(file);
  const video = vidRef.current;
  video.src = objectUrl;
  video.addEventListener("loadedmetadata", getDimensions);
  function getDimensions() {
    const resolution = `${video.videoWidth}x${video.videoHeight}`;
    console.log(resolution);
    video.removeEventListener("loadedmetadata", getDimensions);
    callback(resolution);
  }
}
