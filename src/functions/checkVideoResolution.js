export async function checkVideoResolution(file, video, callback) {
  let url;
  console.log(file);
  if (typeof file == "object") url = URL.createObjectURL(file);
  else url = file;

  video.src = url;
  video.addEventListener("loadedmetadata", getDimensions);
  function getDimensions() {
    const resolution = `${video.videoWidth}x${video.videoHeight}`;
    // console.log(resolution);
    video.removeEventListener("loadedmetadata", getDimensions);
    callback(resolution);
  }
}
