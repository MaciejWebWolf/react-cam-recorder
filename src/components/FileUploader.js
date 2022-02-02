import React, { useState } from "react";
import { uploadFile } from "../functions/uploadFile.js";

const FileUploader = ({ setRandomNum }) => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [file, setFile] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const fullName = file.name;
    const shortName = fullName.substring(0, fullName.indexOf("."));
    const item = { file, fullName, shortName };
    uploadFile(item, e, setUploadStatus, setRandomNum);
  }

  return (
    <div className="file-uploader">
      <h3>Upload a file</h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input type="submit" value="Upload file" name="submit" />
        <p className="results">{uploadStatus}</p>
      </form>
    </div>
  );
};

export default FileUploader;
