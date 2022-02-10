import React, { useState } from "react";
import { uploadFile } from "../functions/uploadFile.js";
import Loader from "./Loader.js";
import { serverMaxSizeBytes } from "../App.js";

const FileUploader = ({ setRandomNum, videoEl, disablePlayer }) => {
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);

  const serverMaxSizeMbytes = (serverMaxSizeBytes / 1024 / 1024).toFixed();
  // console.log(videoEl);

  function handleSubmit(e) {
    e.preventDefault();
    disablePlayer();
    if (!file) return;
    if (file.size > serverMaxSizeBytes) {
      console.log("too large");
      return setStatus({
        msg: `File is too large (max ${serverMaxSizeMbytes}MB)`,
      });
    }

    const index = file.name.lastIndexOf(".");
    let shortName = file.name.substring(0, index);
    shortName = shortName.replace(
      /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
      "_"
    );
    const type = file.name.substring(index + 1);
    const fullName = shortName + "." + type;
    const blob = file;
    const item = { blob, fullName, shortName, type };
    uploadFile(item, setStatus, setRandomNum, videoEl);
  }

  function handleChange(e) {
    setFile(e.target.files[0]);
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
        <input type="file" onChange={handleChange} />
        <input
          disabled={loading}
          type="submit"
          value="Upload file"
          name="submit"
        />
        {loading ? (
          <Loader />
        ) : (
          <div
            className="file-uploader__status"
            dangerouslySetInnerHTML={{ __html: status.msg }}
          ></div>
        )}
      </form>
    </div>
  );
};

export default FileUploader;
