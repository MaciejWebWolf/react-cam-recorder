import { disablePreview } from "../functions/enableDisablePreview.js";
import { disableButtons } from "../functions/enableDisableButtons.js";
import { enableButtons } from "../functions/enableDisableButtons.js";
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
  isScreen,
  setStream,
  recordedVideos,
  setRecordedVideos,
  setRandomNum
) {
  const enablePrevBtn = document.querySelector(".enable-preview");
  const disablePrevBtn = document.querySelector(".disable-preview");
  const video = document.querySelector(".main-video");
  let stream;
  //SCREEN AND AUDIO
  if (isScreen) {
    const audioStream = await captureCamera(settings);
    const screenStream = await captureScreen();

    stream = new MediaStream([
      ...screenStream.getTracks(),
      ...audioStream.getTracks(),
    ]);
  } else {
    disablePreview();
    disableButtons([enablePrevBtn, disablePrevBtn]);
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
    const blob = new Blob(chunks, {
      type: "video/mp4",
    });
    chunks = [];
    const blobUrl = URL.createObjectURL(blob);
    // console.log(blob);
    // console.log(blobUrl);

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
    enableButtons([enablePrevBtn, disablePrevBtn]);
  };
  recorder.start(200);
  // setRecorder(recorder);
  console.log(recorder);
  setStream(recorder);
}
