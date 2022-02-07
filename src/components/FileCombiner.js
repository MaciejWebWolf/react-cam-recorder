import React, { useState } from "react";
import { createWorker } from "@ffmpeg/ffmpeg";

const FileCombiner = () => {
  const [files, setFiles] = useState(null);
  const [message, setMessage] = useState(null);
  const worker = createWorker();

  const concat = async () => {
    setMessage("Loading ffmpeg-core.js");
    await worker.load();
    const names = [];
    for (const f of files) {
      const { name } = f;
      await worker.write(name, f);
      const data = await worker.transcode(name, name + ".mp4");
      names.push(name + ".mp4");
      console.log("data", data);
    }
    setMessage("Start concating");
    await worker.concatDemuxer(names, "output.mp4");
    setMessage("Complete concating");
    const { data } = await worker.read("output.mp4");
    console.log("data", data);
    const video = document.getElementById("output-video");
    video.src = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
  };
  function updateFiles(e) {
    console.log(e.target.files);
    setFiles(e.target.files);
  }
  return (
    <div className="file-combiner">
      <h3>Upload multiple videos to concat to mp4 (x264) and play!</h3>
      <video id="output-video" controls></video>
      <br />
      <input type="file" id="uploader" multiple onChange={updateFiles} />
      <input type="submit" value="Concat" onClick={concat} />
      <p id="message">{message}</p>
    </div>
  );
};

export default FileCombiner;
