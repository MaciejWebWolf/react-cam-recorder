import React, { useState, useRef } from "react";
import { record } from "../functions/record.js";
import SmallCamera from "./SmallCamera.js";
import RecordedVideos from "./RecordedVideos/RecordedVideos.js";
import Buttons from "./Buttons.js";

const Recorder = ({ setRandomNum, videoEl, setIsPlayerActive }) => {
  const [stream, setStream] = useState(null);
  const [recordedVideos, setRecordedVideos] = useState([]);
  const [recording, setRecording] = useState({ camera: false, screen: false });
  const [isSmallCamera, setIsSmallCamera] = useState(false);
  const vidRef = useRef(null);

  function stopRecording() {
    console.log("stopRecording");
    if (stream) {
      if (stream.state != "inactive") {
        stream.stop();
        stream.stream.getTracks().forEach((track) => track.stop());
        console.log(stream);
      }
    }
  }
  function startRecording(source) {
    if (stream) stopRecording();
    record(
      source,
      setStream,
      recordedVideos,
      setRecordedVideos,
      // setRandomNum,
      setRecording,
      setIsSmallCamera,
      vidRef
    );
  }

  return (
    <div>
      <div className="video-recorder">
        <h3>Record a video</h3>
        <video
          ref={vidRef}
          className="main-video"
          autoPlay
          muted
          controls
        ></video>

        <Buttons
          recording={recording}
          startRecording={startRecording}
          setIsSmallCamera={setIsSmallCamera}
          stopRecording={stopRecording}
        ></Buttons>
        <h3></h3>
      </div>

      <SmallCamera isSmallCamera={isSmallCamera} />
      <RecordedVideos
        recordedVideos={recordedVideos}
        setRecordedVideos={setRecordedVideos}
        setRandomNum={setRandomNum}
        videoEl={videoEl}
        setIsPlayerActive={setIsPlayerActive}
      />
    </div>
  );
};

export default Recorder;
