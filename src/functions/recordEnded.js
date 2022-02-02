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
}
