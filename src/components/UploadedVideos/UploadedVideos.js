import React, { useEffect, useState, useRef } from "react";
import { getDataFromDb } from "../../functions/getDataFromDb.js";
import UploadedVideosTableRow from "./UploadedVideosTableRow.js";
import UploadedVideosError from "./UploadedVideosError.js";
import Loader from "../Loader.js";
import UploadedVideosTable from "./UploadedVideosTable.js";
import "./uploadedVideos.css";

const UploadedVideos = ({
  randomNum,
  videosToCombine,
  setVideosToCombine,
  setUploadedVideos,
  videoEl,
  setIsPlayerActive,
}) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [response, setResponse] = useState(null);
  const [num, setRandomNum] = useState(randomNum);
  const [status, setStatus] = useState("");

  useEffect(() => {
    // console.log("useeffect getData");
    getDataFromDb(setError, setIsLoaded, setResponse);
  }, [num, randomNum]);

  useEffect(() => {
    // console.log("useeffect setVideos");
    if (response != null && response.length > 0) {
      const videos = response.map((row) => {
        // console.log(row);
        const { id, name, type, resolution } = row;
        return {
          id,
          combineStatus: false,
          order: 0,
          name,
          type,
          resolution,
        };
      });
      // console.log(videos);
      setUploadedVideos(response);
      setVideosToCombine(videos);
    }
  }, [response]);

  if (error) return <UploadedVideosError error={error} />;
  else if (!isLoaded) return <Loader />;
  else {
    if (response.length > 0) {
      const rows = response.map((row) => {
        return (
          <UploadedVideosTableRow
            key={row.id}
            row={row}
            videosToCombine={videosToCombine}
            setVideosToCombine={setVideosToCombine}
            setStatus={setStatus}
            setRandomNum={setRandomNum}
            videoEl={videoEl}
            setIsPlayerActive={setIsPlayerActive}
          />
        );
      });
      return (
        <div className="uploaded-videos">
          <h3>Uploaded Videos</h3>
          <div
            className="uploaded-videos__status"
            dangerouslySetInnerHTML={{ __html: status.msg }}
          ></div>
          <div className="uploaded-videos__results">
            <UploadedVideosTable rows={rows} />
          </div>
        </div>
      );
    }
  }
};

export default UploadedVideos;
