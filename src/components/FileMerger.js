import { apiURL } from "../App.js";
import { mergeFiles } from "../functions/mergeFiles.js";
import Loader from "./Loader.js";

import React, { useState } from "react";
const FileMerger = ({ videosToCombine, uploadedVideos, setRandomNum }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [resolution, setResolution] = useState("640x480");

  function merge(e) {
    e.preventDefault();
    if (name === "")
      return setStatus({
        error: true,
        msg: "Output file name is missing",
      });
    const nameAlreadyExists = uploadedVideos.find((vid) =>
      vid.name === name ? vid : null
    );

    const myRegEx = /^([a-zA-Z0-9_-]+)$/;
    var isValid = myRegEx.test(name);
    if (!isValid)
      return setStatus({
        error: true,
        msg: "Only letters, numbers, dash(-) and underscore(_) are allowed. ",
      });

    if (nameAlreadyExists)
      return setStatus({
        error: true,
        msg: `File with name "${name}" already exists.`,
      });
    const zeroVideosChosen = videosToCombine.find((vid) =>
      vid.combineStatus == true ? vid : null
    );
    if (!zeroVideosChosen)
      return setStatus({
        error: true,
        msg: "You did not select any video",
      });

    const videos = videosToCombine.filter((vid) =>
      vid.combineStatus ? vid : null
    );
    videos.sort((a, b) => a.order - b.order);

    setStatus("");
    mergeFiles(videos, name, resolution, setStatus, setRandomNum);
  }

  // if (uploadedVideos.length > 0) {
  // }
  const loading = status === "loading";

  return (
    <div className="combine-videos">
      <h3>Combine videos</h3>
      <form method="POST" onSubmit={merge} className="combine-videos__form">
        <label htmlFor="resolution">Resolution</label>
        <select
          name="resolution"
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
        >
          <option value="640x480">640x480</option>
          <option value="1280x720">1280x720</option>
          <option value="1920x1080">1920x1080</option>
        </select>
        <label htmlFor="name">Output file name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          name="name"
        />
        <input
          type="submit"
          value="Combine selected videos"
          disabled={loading}
        />
        {loading ? (
          <Loader />
        ) : (
          <div
            className="combine-videos__status"
            dangerouslySetInnerHTML={{ __html: status.msg }}
          ></div>
        )}
      </form>
    </div>
  );
};

export default FileMerger;
