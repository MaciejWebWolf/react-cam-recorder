import React from "react";
import RecordedVideosTable from "./RecordedVideosTable";
import RecordedVideosTableRow from "./RecordedVideosTableRow";

const RecordedVideos = ({ recordedVideos }) => {
  const rows = recordedVideos.map((video) => {
    const { blob, blobUrl, setRandomNum } = video;
    return (
      <RecordedVideosTableRow
        file={blob}
        blobUrl={blobUrl}
        setRandomNum={setRandomNum}
        key={blobUrl}
      ></RecordedVideosTableRow>
    );
  });

  return (
    <div className="recorded-videos">
      <h3>Recorded Videos</h3>
      <div className="recorded-videos__table">
        {/* {videos.length > 0 ? videos : "0 results"} */}
        <RecordedVideosTable rows={rows} />
      </div>
    </div>
  );
};

export default RecordedVideos;
