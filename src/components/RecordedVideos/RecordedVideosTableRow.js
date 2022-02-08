import { uploadFile } from "../../functions/uploadFile.js";
import React, { useEffect, useState } from "react";
import Loader from "../Loader.js";
import Check from "../../icons/check.svg";
import SadFace from "../../icons/sad-face.svg";

const RecordedVideosTableRow = ({
  file,
  blobUrl,
  setRandomNum,
  // status,
  setTextStatus,
  recordedVideos,
  setRecordedVideos,
}) => {
  const [status, setStatus] = useState("");
  console.log(status);
  useEffect(() => {
    setTextStatus(status);
  }, [status]);

  console.log(recordedVideos);
  const type = "mp4";
  const fullName = blobUrl.slice(blobUrl.length - 12) + "." + type;
  const shortName = blobUrl.slice(blobUrl.length - 12);
  // const [status, setStatus] = useState("");
  const size = file.size;
  const mbytes = (size / 1024 / 1024).toFixed(2);

  function upload(e) {
    const item = { file, fullName, shortName, type };
    e.preventDefault();
    uploadFile(item, setStatus, setRandomNum);
  }
  const loading = status === "loading";
  let statusIcon;
  if (status != "") {
    statusIcon = <img src={status.error === false ? Check : SadFace} alt="" />;
  }

  function remove() {
    const index = recordedVideos.findIndex((vid) => vid.blobUrl === blobUrl);
    console.log(index);
    let recordedVideosClone = JSON.parse(JSON.stringify(recordedVideos));
    recordedVideosClone.splice(index, 1);
    console.log(recordedVideosClone);
    setRecordedVideos(recordedVideosClone);
  }

  return (
    <tr>
      <td>{shortName}</td>
      <td>{mbytes}</td>
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
