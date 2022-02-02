import { uploadFile } from "../functions/uploadFile.js";
import React, { useState } from "react";

const RecordedVideoRow = ({ file, blobUrl, setRandomNum }) => {
  const fullName = blobUrl.slice(blobUrl.length - 12) + ".mp4";
  const shortName = blobUrl.slice(blobUrl.length - 12);
  const [uploadStatus, setUploadStatus] = useState("");

  const item = { file, fullName, shortName };

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
