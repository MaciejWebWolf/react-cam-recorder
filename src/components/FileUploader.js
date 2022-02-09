import React, { useState, useRef, useEffect } from "react";
import { uploadFile } from "../functions/uploadFile.js";
import Loader from "./Loader.js";
import { serverMaxSizeBytes } from "../App.js";

const FileUploader = ({ setRandomNum }) => {
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [resolution, setResolution] = useState(null);

  const vidRef = useRef(null);
  const serverMaxSizeMbytes = (serverMaxSizeBytes / 1024 / 1024).toFixed();

  // console.log(file);

  function handleSubmit(e) {
    e.preventDefault();
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
    const item = { blob, fullName, shortName, type, resolution };
    uploadFile(item, setStatus, setRandomNum);
  }
  function checkVideoResolution() {
    var objectUrl = URL.createObjectURL(file);
    const video = vidRef.current;
    video.src = objectUrl;
    video.addEventListener("loadedmetadata", getDimensions);
    function getDimensions() {
      const resolution = `${this.videoWidth}x${this.videoHeight}`;
      console.log(resolution);
      setResolution(resolution);
      video.removeEventListener("loadedmetadata", getDimensions);
    }
  }

  useEffect(() => {
    if (file) checkVideoResolution();
  }, [file]);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }
  const loading = status === "loading";

  return (
    <div className="file-uploader">
      <video ref={vidRef} style={{ display: "none" }}></video>
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
