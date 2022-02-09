import { captureCamera } from "./captureCamera.js";
import { captureScreen } from "./captureScreen.js";
import { recordEnded } from "./recordEnded.js";

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
  setRecording,
  setIsSmallCamera,
  vidRef
) {
  console.log(vidRef.current);
  const video = vidRef.current;
  let stream;
  //SCREEN AND AUDIO - SOURCE
  if (source === "screen") {
    setRecording({ camera: false, screen: true });
    const audioStream = await captureCamera(settings);
    const screenStream = await captureScreen();
    if (!screenStream || !audioStream)
      return setRecording({ camera: false, screen: false });
    console.log(screenStream);
    console.log(screenStream.getTracks());
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
    if (event.data.size > 0) chunks.push(event.data);
  };
  recorder.onstop = () => {
    recordEnded(chunks, video, recordedVideos, setRecordedVideos, setRecording);
  };

  recorder.start(200);
  setStream(recorder);
}
