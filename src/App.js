import React, { useState } from "react";
import "./App.css";
import FileCombiner from "./components/FileCombiner";
import FileUploader from "./components/FileUploader.js";
import FileMerger from "./components/FileMerger.js";
import Recorder from "./components/Recorder";
import UploadedVideos from "./components/UploadedVideos/UploadedVideos";
import CheckResolutionVideo from "./components/CheckResolutionVideo";

export const serverMaxSizeBytes = 600000000;
// export const apiURL = "https://pravna.git-webwolf.pl/";
export const apiURL = "http://localhost/";

function App() {
  const [randomNum, setRandomNum] = useState(0);
  const [videosToCombine, setVideosToCombine] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);

  return (
    <div className="container">
      <div className="left">
        <Recorder setRandomNum={setRandomNum}></Recorder>
      </div>
      <div className="right">
        <FileUploader setRandomNum={setRandomNum}></FileUploader>
        {/* <FileCombiner /> */}

        <UploadedVideos
          randomNum={randomNum}
          videosToCombine={videosToCombine}
          setVideosToCombine={setVideosToCombine}
          setUploadedVideos={setUploadedVideos}
        ></UploadedVideos>
        <FileMerger
          videosToCombine={videosToCombine}
          uploadedVideos={uploadedVideos}
          setRandomNum={setRandomNum}
        />
        {/* <CheckResolutionVideo /> */}
        <video
          src=""
          className="check-resolution-video"
          style={{ display: "none" }}
        ></video>
      </div>
    </div>
  );
}

export default App;
