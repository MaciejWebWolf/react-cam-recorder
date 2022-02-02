import React from "react";

const Buttons = ({
  recording,
  startRecording,
  setIsSmallCamera,
  stopRecording,
}) => {
  return (
    <div className="buttons">
      <div>
        <button
          onClick={() => startRecording("camera")}
          className="record-cam"
          disabled={recording.camera || recording.screen}
        >
          Record camera
        </button>
        <button
          onClick={() => startRecording("screen")}
          className="record-screen-audio"
          disabled={recording.camera || recording.screen}
        >
          Record Screen and audio
        </button>
        <button onClick={stopRecording} className="stop">
          Stop!
        </button>
      </div>
      <div>
        <button
          onClick={() => setIsSmallCamera(true)}
          className="enable-preview"
          disabled={recording.camera}
        >
          Enable Preview
        </button>
        <button
          onClick={() => setIsSmallCamera(false)}
          className="disable-preview"
          disabled={recording.camera}
        >
          Disable Preview
        </button>
      </div>
    </div>
  );
};

export default Buttons;
