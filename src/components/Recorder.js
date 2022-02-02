import React, { useState } from "react";
import { record } from "./record.js";
import SmallCamera from "./SmallCamera.js";
import RecordedVideos from "./RecordedVideos.js";
import Buttons from "./Buttons.js";

const Recorder = ({ setRandomNum }) => {
  const [stream, setStream] = useState(null);
  const [recordedVideos, setRecordedVideos] = useState([]);
  const [recording, setRecording] = useState({ camera: false, screen: false });
  const [isSmallCamera, setIsSmallCamera] = useState(false);

  function stopRecording() {
    console.log("stopRecording");
    if (stream) {
      if (stream.state != "inactive") stream.stop();
      stream.stream.getTracks().forEach((track) => track.stop());
      console.log(stream);
    }
  }
  function startRecording(source) {
    if (stream) stopRecording();
    record(
      source,
      setStream,
      recordedVideos,
      setRecordedVideos,
      setRandomNum,
      setRecording,
      setIsSmallCamera
    );
  }

  return (
    <div>
      <video className="main-video" autoPlay muted></video>

      <Buttons
        recording={recording}
        startRecording={startRecording}
        setIsSmallCamera={setIsSmallCamera}
        stopRecording={stopRecording}
      ></Buttons>
      <SmallCamera isSmallCamera={isSmallCamera} />
      <RecordedVideos recordedVideos={recordedVideos} />
    </div>
  );
};

export default Recorder;
