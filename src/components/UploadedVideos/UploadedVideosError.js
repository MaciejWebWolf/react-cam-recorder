import React from "react";
const UploadedVideosError = ({ error }) => {
  return (
    <div>
      {"Error status: " +
        error.target.status +
        ", Error text:  " +
        error.target.statusText}
    </div>
  );
};

export default UploadedVideosError;
