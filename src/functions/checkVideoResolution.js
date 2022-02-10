export async function checkVideoResolution(file, video, callback) {
  let url;
  // console.log(file);
  // console.log(video);
  if (typeof file == "object") url = URL.createObjectURL(file);
  else url = file;

  video.addEventListener("loadedmetadata", getDimensions);
  function getDimensions() {
    const resolution = `${video.videoWidth}x${video.videoHeight}`;
    // console.log(resolution);
    video.removeEventListener("loadedmetadata", getDimensions);
    callback(resolution);
  }
}
