import React, { useEffect, useState } from "react";
import { mergeFiles } from "../functions/mergeFiles.js";
import Loader from "./Loader.js";
import "./FileMerger.css";

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
  const [radioChoice, setRadioChoice] = useState("fast");

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
      radioChoice,
      setStatus,
      setRandomNum,
      videoEl
    );

    // mergeFiles(videos, name, setStatus, setRandomNum, videoEl);
  }
  const loading = status === "loading";

  useEffect(() => {
    if (!loading) setMergingInProgress(false);
  }, [status]);

  return (
    <div className="combine-videos">
      <h3>Combine videos</h3>
      <form method="POST" onSubmit={merge} className="combine-videos__form">
        <div className="combine-videos__radios">
          <div>
            <input
              type="radio"
              name="combining"
              onChange={(e) => setRadioChoice("very-fast")}
              value="very-fast"
              checked={radioChoice === "very-fast"}
            />
            <label htmlFor="">
              Very Fast Combining (same format, same resolution, same codec)
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="combining"
              onChange={(e) => setRadioChoice("fast")}
              value="fast"
              checked={radioChoice === "fast"}
            />
            <label htmlFor="">Fast Combining (same format)</label>
          </div>
          <div>
            <input
              type="radio"
              name="combining"
              onChange={(e) => setRadioChoice("slow")}
              value="slow"
              checked={radioChoice === "slow"}
            />
            <label htmlFor="">Slow Combining (different files)</label>
          </div>
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
