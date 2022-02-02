import React from "react";
import RecordedVideoRow from "./RecordedVideosRow";
const RecordedVideos = ({ recordedVideos }) => {
  const videos = recordedVideos.map((video) => {
    const { blob, blobUrl, setRandomNum } = video;
    return (
      <RecordedVideoRow
        file={blob}
        blobUrl={blobUrl}
        setRandomNum={setRandomNum}
        key={blobUrl}
      ></RecordedVideoRow>
    );
  });

  return (
    <div className="recorded-videos">
      <h3>Recorded Videos</h3>
      <div className="recorded-videos__list">
        {videos.length > 0 ? videos : "0 results"}
      </div>
    </div>
  );
};

export default RecordedVideos;
