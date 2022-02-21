import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import FileCombiner from "./components/FileCombiner";
import FileUploader from "./components/FileUploader.js";
import FileMerger from "./components/FileMerger.js";
import Recorder from "./components/Recorder";
import UploadedVideos from "./components/UploadedVideos/UploadedVideos";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export const serverMaxSizeBytes = 600000000;
// export const apiURL = "https://pravna.git-webwolf.pl/";
// export const apiURL = "http://localhost/";
export const apiURL = "http://127.0.0.1:8000/";

function App() {
  const [randomNum, setRandomNum] = useState(0);
  const [videosToCombine, setVideosToCombine] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [ref, setRef] = useState(null);
  const [mergingInProgress, setMergingInProgress] = useState(null);

  const vidRef = useRef(null);
  const videoEl = vidRef.current;
  const [isPlayerActive, setIsPlayerActive] = useState(false);
  useEffect(() => {
    if (ref === null) setRef(true);
  }, [ref]);

  function disablePlayer() {
    videoEl.src = null;
    setIsPlayerActive(false);
  }

  return (
    <div className="container">
      <div className="top">
        <LoginForm />
        <RegisterForm />
      </div>
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
          disablePlayer={disablePlayer}
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
          mergingInProgress={mergingInProgress}
        ></UploadedVideos>
        <FileMerger
          videosToCombine={videosToCombine}
          uploadedVideos={uploadedVideos}
          setRandomNum={setRandomNum}
          videoEl={videoEl}
          disablePlayer={disablePlayer}
          setMergingInProgress={setMergingInProgress}
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
