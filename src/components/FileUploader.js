import React, { useState } from "react";
import { uploadFile } from "../functions/uploadFile.js";
import Loader from "./Loader.js";
import { serverMaxSizeBytes } from "../App.js";

const FileUploader = ({ setRandomNum }) => {
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const serverMaxSizeMbytes = (serverMaxSizeBytes / 1024 / 1024).toFixed();

  function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;
    if (file.size > serverMaxSizeBytes)
      return setStatus(`File is too large (max ${serverMaxSizeMbytes}MB)`);

    const index = file.name.lastIndexOf(".");
    let shortName = file.name.substring(0, index);
    shortName = shortName.replace(
      /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
      "_"
    );
    const type = file.name.substring(index + 1);
    const fullName = shortName + "." + type;
    console.log(shortName);
    console.log(fullName);
    const item = { file, fullName, shortName, type };
    uploadFile(item, setStatus, setRandomNum);
  }

  const loading = status === "loading";

  return (
    <div className="file-uploader">
      <h3>Upload a file</h3>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="file-uploader__form"
      >
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input
          disabled={loading}
          type="submit"
          value="Upload file"
          name="submit"
        />
        <span className="file-uploader__status">
          {loading ? <Loader /> : status}
        </span>
      </form>
    </div>
  );
};

export default FileUploader;
