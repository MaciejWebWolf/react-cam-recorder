import React, { useState, useRef } from "react";
import "./App.css";
import FileCombiner from "./components/FileCombiner";
import FileUploader from "./components/FileUploader.js";
import FileMerger from "./components/FileMerger.js";
import Recorder from "./components/Recorder";
import UploadedVideos from "./components/UploadedVideos/UploadedVideos";

export const serverMaxSizeBytes = 600000000;
// export const apiURL = "https://pravna.git-webwolf.pl/";
export const apiURL = "http://localhost/";

function App() {
  const [randomNum, setRandomNum] = useState(0);
  const [videosToCombine, setVideosToCombine] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);

  const vidRef = useRef(null);
  const videoEl = vidRef.current;
  const [isPlayerActive, setIsPlayerActive] = useState(false);

  function disablePlayer() {
    videoEl.src = null;
    setIsPlayerActive(false);
  }
  return (
    <div className="container">
      <div className="left">
        <Recorder
          setRandomNum={setRandomNum}
          videoEl={videoEl}
          setIsPlayerActive={setIsPlayerActive}
        ></Recorder>
      </div>
      <div className="right">
        <FileUploader
          setRandomNum={setRandomNum}
          videoEl={videoEl}
        ></FileUploader>
        {/* <FileCombiner /> */}

        <UploadedVideos
          randomNum={randomNum}
          videosToCombine={videosToCombine}
          setVideosToCombine={setVideosToCombine}
          setUploadedVideos={setUploadedVideos}
          videoEl={videoEl}
          setIsPlayerActive={setIsPlayerActive}
        ></UploadedVideos>
        <FileMerger
          videosToCombine={videosToCombine}
          uploadedVideos={uploadedVideos}
          setRandomNum={setRandomNum}
          videoEl={videoEl}
        />
        <div
          className={
            isPlayerActive ? "player-wrapper active" : "player-wrapper"
          }
        >
          <button className="player-close" onClick={disablePlayer}>
            X
          </button>
          <video
            ref={vidRef}
            src=""
            className="player"
            controls
            autoPlay
          ></video>
        </div>
      </div>
    </div>
  );
}

export default App;
