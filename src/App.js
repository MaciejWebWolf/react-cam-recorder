import React, { useState } from "react";
import "./App.css";
import FileUploader from "./components/FileUploader.js";
import Recorder from "./components/Recorder";
import UploadedVideos from "./components/UploadedVideos";

function App() {
  const [randomNum, setRandomNum] = useState(0);

  return (
    <div className="container">
      <div className="left">
        <Recorder setRandomNum={setRandomNum}></Recorder>
      </div>
      <div className="right">
        <FileUploader setRandomNum={setRandomNum}></FileUploader>
        <UploadedVideos randomNum={randomNum}></UploadedVideos>
      </div>
    </div>
  );
}

export default App;
