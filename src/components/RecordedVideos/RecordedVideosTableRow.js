import { uploadFile } from "../../functions/uploadFile.js";
import React, { useEffect, useState } from "react";
import Loader from "../Loader.js";
import Check from "../../icons/check.svg";
import SadFace from "../../icons/sad-face.svg";

const RecordedVideosTableRow = ({
  video,
  setRandomNum,
  setTextStatus,
  recordedVideos,
  setRecordedVideos,
  videoEl,
  setIsPlayerActive,
}) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    setTextStatus(status);
  }, [status]);

  // console.log(recordedVideos);

  const { blob, blobUrl, type, fullName, shortName, size, resolution } = video;
  const mbytes = (size / 1024 / 1024).toFixed(2);

  function upload(e) {
    // const item = { blob, fullName, shortName, type, resolution };
    e.preventDefault();
    uploadFile(video, setStatus, setRandomNum);
  }
  const loading = status === "loading";
  let statusIcon;
  if (status != "") {
    statusIcon = <img src={status.error === false ? Check : SadFace} alt="" />;
  }

  function remove() {
    const index = recordedVideos.findIndex((vid) => vid.blobUrl === blobUrl);
    // let recordedVideosClone = JSON.parse(JSON.stringify(recordedVideos));
    let recordedVideosClone = [...recordedVideos];
    recordedVideosClone.splice(index, 1);
    console.log(recordedVideosClone);
    setRecordedVideos(recordedVideosClone);
    setTextStatus({ msg: "" });
  }
  function playVideo() {
    videoEl.src = blobUrl;
    setIsPlayerActive(true);
  }
  // console.log("render");
  return (
    <tr>
      <td>{shortName}</td>
      <td>{mbytes}</td>
      <td>{resolution}</td>
      <td>
        <button onClick={playVideo}>Play</button>
      </td>
      <td>
        <button onClick={remove}>Remove</button>{" "}
      </td>
      <td>
        <a href={blobUrl} download={shortName}>
          Download
        </a>
      </td>
      <td>
        <button onClick={upload} disabled={loading}>
          Upload file
        </button>
      </td>
      <td>{loading ? <Loader /> : statusIcon}</td>
    </tr>
  );
};

export default RecordedVideosTableRow;
