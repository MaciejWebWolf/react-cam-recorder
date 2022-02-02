import { captureCamera } from "../functions/captureCamera.js";
import { captureScreen } from "../functions/captureScreen.js";
import RecordedVideoRow from "./RecordedVideoRow";

const settings = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100,
  },
  video: false,
};

export async function record(
  source,
  setStream,
  recordedVideos,
  setRecordedVideos,
  setRandomNum,
  setRecording,
  setIsSmallCamera
) {
  const video = document.querySelector(".main-video");
  let stream;
  //SCREEN AND AUDIO - SOURCE
  if (source === "screen") {
    setRecording({ camera: false, screen: true });
    const audioStream = await captureCamera(settings);
    const screenStream = await captureScreen();
    if (!screenStream || !audioStream)
      return setRecording({ camera: false, screen: false });

    stream = new MediaStream([
      ...screenStream.getTracks(),
      ...audioStream.getTracks(),
    ]);
  }
  //CAMERA - SOURCE
  else if (source === "camera") {
    setRecording({ camera: true, screen: false });
    setIsSmallCamera(false);
    stream = await captureCamera();
  }

  video.src = null;
  video.srcObject = stream;
  video.muted = true;

  const recorder = new MediaRecorder(stream);
  let chunks = [];
  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      chunks.push(event.data);
    }
  };
  recorder.onstop = () => {
    console.log("recorder onstop");
    const blob = new Blob(chunks, {
      type: "video/mp4",
    });
    chunks = [];
    const blobUrl = URL.createObjectURL(blob);
    video.srcObject = null;
    video.src = blobUrl;
    video.muted = false;
    const recordedVideo = (
      <RecordedVideoRow
        file={blob}
        blobUrl={blobUrl}
        setRandomNum={setRandomNum}
        key={blobUrl}
      />
    );
    const recordedVideosNew = [...recordedVideos, recordedVideo];
    setRecordedVideos(recordedVideosNew);
    setRecording({ camera: false, screen: false });
  };
  recorder.start(200);
  setStream(recorder);
}
