import React, { useState } from "react";
import { record } from "./record.js";
import {
  enablePreview,
  disablePreview,
} from "../functions/enableDisablePreview.js";
const Recorder = ({ setRandomNum }) => {
  const [stream, setStream] = useState(null);
  // const [index, setIndex] = useState(1);
  const [recordedVideos, setRecordedVideos] = useState([]);

  function stopRecording() {
    stream.stream.getTracks().forEach((track) => track.stop());
  }

  return (
    <div>
      <video className="main-video" autoPlay muted controls></video>

      <div className="buttons">
        <div>
          <button
            onClick={() =>
              record(
                false,
                setStream,
                recordedVideos,
                setRecordedVideos,
                setRandomNum
              )
            }
            className="record-cam"
          >
            Record camera
          </button>
          <button
            onClick={() =>
              record(
                true,
                setStream,
                recordedVideos,
                setRecordedVideos,
                setRandomNum
              )
            }
            className="record-screen-audio"
          >
            Record Screen and audio
          </button>
          <button onClick={stopRecording} className="stop">
            Stop!
          </button>
        </div>
        <div>
          <button onClick={enablePreview} className="enable-preview">
            Enable Preview
          </button>
          <button onClick={disablePreview} className="disable-preview">
            Disable Preview
          </button>
        </div>
      </div>

      <div className="preview-wrapper">
        <video className="preview-video" muted controls></video>
      </div>

      <div className="recorded-videos">
        <h3>Recorded Videos</h3>
        <div className="recorded-videos__list">{recordedVideos}</div>
      </div>
    </div>
  );
};

export default Recorder;
