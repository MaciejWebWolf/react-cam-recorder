import { apiURL } from "../App.js";
import { mergeFiles } from "../functions/mergeFiles.js";
import Loader from "./Loader.js";

import React, { useState } from "react";
const FileMerger = ({ videosToCombine, uploadedVideos, setRandomNum }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  function merge(e) {
    e.preventDefault();
    if (name === "") return setStatus("Output file name is missing");
    const nameAlreadyExists = uploadedVideos.find((vid) =>
      vid.name === name ? vid : null
    );

    const myRegEx = /^([a-zA-Z0-9_-]+)$/;
    var isValid = myRegEx.test(name);
    if (!isValid)
      return setStatus(
        "Only letters, numbers, dash(-) and underscore(_) are allowed. "
      );

    if (nameAlreadyExists)
      return setStatus(`File with name "${name}" already exists.`);
    const zeroVideosChosen = videosToCombine.find((vid) =>
      vid.combineStatus == true ? vid : null
    );
    if (!zeroVideosChosen) return setStatus("You did not select any video");

    const videos = videosToCombine.filter((vid) =>
      vid.combineStatus ? vid : null
    );
    videos.sort((a, b) => a.order - b.order);

    setStatus("");
    mergeFiles(videos, name, setStatus, setRandomNum);
  }

  if (uploadedVideos.length > 0) {
  }
  const loading = status === "loading";

  return (
    <div className="combine-videos">
      <h3>Combine videos</h3>
      <form method="POST" onSubmit={merge} className="combine-videos__form">
        Output file name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
        <input
          type="submit"
          value="Combine selected videos"
          disabled={loading}
        />
        <span className="combine-videos__status">
          {loading ? <Loader /> : status}
        </span>
      </form>
    </div>
  );
};

export default FileMerger;
