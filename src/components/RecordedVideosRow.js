import { uploadFile } from "../functions/uploadFile.js";
import React, { useState } from "react";

const RecordedVideoRow = ({ file, blobUrl, setRandomNum }) => {
  const type = "mp4";
  const fullName = blobUrl.slice(blobUrl.length - 12) + "." + type;
  const shortName = blobUrl.slice(blobUrl.length - 12);
  const [uploadStatus, setUploadStatus] = useState("");

  const item = { file, fullName, shortName, type };
  // console.log(file);

  return (
    <div className="row">
      <p>Video: {shortName}</p>
      <a href={blobUrl} download={shortName}>
        Download
      </a>
      <button
        onClick={(e) => uploadFile(item, e, setUploadStatus, setRandomNum)}
      >
        Upload file
      </button>
      <p className="results">{uploadStatus}</p>
    </div>
  );
};

export default RecordedVideoRow;
