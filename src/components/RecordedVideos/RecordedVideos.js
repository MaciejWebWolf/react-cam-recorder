import React, { useState } from "react";
import RecordedVideosTable from "./RecordedVideosTable";
import RecordedVideosTableRow from "./RecordedVideosTableRow";

const RecordedVideos = ({ recordedVideos, setRecordedVideos }) => {
  const [status, setStatus] = useState("");

  const rows = recordedVideos.map((video) => {
    const { blob, blobUrl, setRandomNum } = video;
    return (
      <RecordedVideosTableRow
        key={blobUrl}
        file={blob}
        blobUrl={blobUrl}
        setRandomNum={setRandomNum}
        // status={status}
        setTextStatus={setStatus}
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
        dangerouslySetInnerHTML={{ __html: status.msg }}
      ></div>
      <div className="recorded-videos__table">
        <RecordedVideosTable rows={rows} />
      </div>
    </div>
  );
};

export default RecordedVideos;
