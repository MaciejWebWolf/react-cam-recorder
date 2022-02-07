export function recordEnded(
  chunks,
  video,
  recordedVideos,
  setRecordedVideos,
  setRecording,
  setRandomNum
) {
  console.log("recorder onstop");
  const blob = new Blob(chunks, {
    type: "video/mp4",
  });
  chunks = [];
  const blobUrl = URL.createObjectURL(blob);
  video.srcObject = null;
  video.src = blobUrl;
  video.muted = false;
  const recordedVideo = {
    blob,
    blobUrl,
    setRandomNum,
  };
  const recordedVideosNew = [...recordedVideos, recordedVideo];
  console.log(recordedVideosNew);
  setRecordedVideos(recordedVideosNew);
  setRecording({ camera: false, screen: false });
  console.log(video.duration);
  console.log(video.currentTime);
  console.log(video.currentTime);
  async function x() {
    // When the metadata is loaded, duration can be read.
    await new Promise((r) => setTimeout(r, 1000));
    video.currentTime = 10000000 * Math.random();
    // video.currentTime = 123321123321;
    console.log(video.currentTime);
    console.log(video.duration);
    video.removeEventListener("loadedmetadata", x);
  }
  video.addEventListener("loadedmetadata", x);
}
