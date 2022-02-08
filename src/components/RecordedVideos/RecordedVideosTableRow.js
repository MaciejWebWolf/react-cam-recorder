import { uploadFile } from "../../functions/uploadFile.js";
import React, { useState } from "react";
import Loader from "../Loader.js";

const RecordedVideosTableRow = ({ file, blobUrl, setRandomNum }) => {
  const type = "mp4";
  const fullName = blobUrl.slice(blobUrl.length - 12) + "." + type;
  const shortName = blobUrl.slice(blobUrl.length - 12);
  const [status, setStatus] = useState("");

  const item = { file, fullName, shortName, type };
  function upload(e) {
    e.preventDefault();
    uploadFile(item, setStatus, setRandomNum);
  }
  const loading = status === "loading";

  return (
    <tr>
      <td>{shortName}</td>
      <td>size</td>
      <td>remove</td>
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
      <td>
        <p className="results"> {loading ? <Loader /> : status}</p>
      </td>
    </tr>
  );
};

export default RecordedVideosTableRow;
