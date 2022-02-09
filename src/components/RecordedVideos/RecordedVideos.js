import React, { useState } from "react";
import RecordedVideosTable from "./RecordedVideosTable";
import RecordedVideosTableRow from "./RecordedVideosTableRow";

const RecordedVideos = ({
  recordedVideos,
  setRecordedVideos,
  setRandomNum,
}) => {
  const [textStatus, setTextStatus] = useState("");

  const rows = recordedVideos.map((video) => {
    return (
      <RecordedVideosTableRow
        key={video.shortName}
        video={video}
        setRandomNum={setRandomNum}
        setTextStatus={setTextStatus}
        recordedVideos={recordedVideos}
        setRecordedVideos={setRecordedVideos}
      ></RecordedVideosTableRow>
    );
  });

  return (
    <div className="recorded-videos">
      <h3>Recorded Videos</h3>
      <div
        className="recorded-videos__status"
        dangerouslySetInnerHTML={{ __html: textStatus.msg }}
      ></div>
      <div className="recorded-videos__table">
        <RecordedVideosTable rows={rows} />
      </div>
    </div>
  );
};

export default RecordedVideos;
