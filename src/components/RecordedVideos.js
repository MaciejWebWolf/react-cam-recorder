import React from "react";
const RecordedVideos = ({ recordedVideos }) => {
  return (
    <div className="recorded-videos">
      <h3>Recorded Videos</h3>
      <div className="recorded-videos__list">
        {recordedVideos.length > 0 ? recordedVideos : "0 results"}
      </div>
    </div>
  );
};

export default RecordedVideos;
