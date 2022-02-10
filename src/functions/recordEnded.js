export function recordEnded(
  chunks,
  video,
  recordedVideos,
  setRecordedVideos,
  setRecording
) {
  console.log("recorder onstop");
  const blob = new Blob(chunks, {
    type: "video/mp4",
  });
  chunks = [];
  const blobUrl = URL.createObjectURL(blob);
  video.srcObject = null;
  video.src = blobUrl;
  video.autoplay = false;
  video.muted = false;
  video.addEventListener("loadedmetadata", getDimensions);
  function getDimensions() {
    const resolution = `${video.videoWidth}x${video.videoHeight}`;
    console.log(resolution);
    video.removeEventListener("loadedmetadata", getDimensions);
    prepareData(resolution);
  }
  function prepareData(resolution) {
    const type = "mp4";
    const fullName = blobUrl.slice(blobUrl.length - 12) + "." + type;
    const shortName = blobUrl.slice(blobUrl.length - 12);
    const size = blob.size;
    const recordedVideo = {
      blob,
      blobUrl,
      type,
      fullName,
      shortName,
      size,
      resolution,
    };
    const recordedVideosClone = [...recordedVideos, recordedVideo];
    // let recordedVideosClone = JSON.parse(JSON.stringify(recordedVideos));
    // recordedVideosClone = [...recordedVideosClone, recordedVideo];
    console.log(recordedVideosClone);
    setRecordedVideos(recordedVideosClone);
    setRecording({ camera: false, screen: false });
  }

  // console.log(video.duration);
  // console.log(video.currentTime);
  // console.log(video.currentTime);
  // async function x() {
  //   // When the metadata is loaded, duration can be read.
  //   await new Promise((r) => setTimeout(r, 1000));
  //   video.currentTime = 10000000 * Math.random();
  //   // video.currentTime = 123321123321;
  //   console.log(video.currentTime);
  //   console.log(video.duration);
  //   video.removeEventListener("loadedmetadata", x);
  // }
  // video.addEventListener("loadedmetadata", x);
}
