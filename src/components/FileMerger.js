import { apiURL } from "../App.js";
import { mergeFiles } from "../functions/mergeFiles.js";
import Loader from "./Loader.js";

import React, { useState } from "react";
const FileMerger = ({
  videosToCombine,
  uploadedVideos,
  setRandomNum,
  videoEl,
  disablePlayer,
  setMergingInProgress,
}) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [resolution, setResolution] = useState("640:480");
  const [fastCombining, setFastCombining] = useState(false);

  function merge(e) {
    e.preventDefault();
    disablePlayer();
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
    setMergingInProgress(videos);
    mergeFiles(
      videos,
      name,
      resolution,
      fastCombining,
      setStatus,
      setRandomNum,
      videoEl
    );

    // mergeFiles(videos, name, setStatus, setRandomNum, videoEl);
  }

  if (status && status.error === false) {
    setMergingInProgress(false);
  }

  console.log(fastCombining);

  const loading = status === "loading";

  return (
    <div className="combine-videos">
      <h3>Combine videos</h3>
      <form method="POST" onSubmit={merge} className="combine-videos__form">
        <div>
          <input
            type="checkbox"
            name="fast-combining"
            onChange={(e) => setFastCombining(e.target.checked)}
            checked={fastCombining}
          />
          <label htmlFor="fast-combining">
            Fast Combining (same format, same resolution, same codec)
          </label>
        </div>

        <label htmlFor="resolution">Resolution</label>
        <select
          name="resolution"
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
        >
          <option value="640:480">640:480</option>
          <option value="1280:720">1280:720</option>
          <option value="1920:1080">1920:1080</option>
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
