export async function checkVideoResolution(file, video, callback) {
  console.log(file);
  let url;
  if (typeof file == "object") url = URL.createObjectURL(file);
  else url = file;

  video.src = url;
  video.muted = true;
  video.autoplay = false;

  video.addEventListener("loadedmetadata", getDimensions);
  function getDimensions() {
    const resolution = `${video.videoWidth}x${video.videoHeight}`;
    // console.log(resolution);
    video.removeEventListener("loadedmetadata", getDimensions);
    callback(resolution);
    console.log(resolution);
  }
}
