import React, { useEffect, useState } from "react";
import { getDataFromDb } from "../functions/getDataFromDb.js";
import { removeDataFromDb } from "../functions/removeDataFromDb.js";

const UploadedVideos = ({
  randomNum,
  videosToCombine,
  setVideosToCombine,
  setUploadedVideos,
}) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [response, setResponse] = useState([]);
  const [num, setRandomNum] = useState(randomNum);
  const [uploadStatus, setUploadStatus] = useState("");
  // const [videosToCombine, setVideosToCombine] = useState([]);

  useEffect(() => {
    console.log("useeffect getData");
    getDataFromDb(setError, setIsLoaded, setResponse);
  }, [num, randomNum]);

  useEffect(() => {
    console.log("useeffect setVideos");
    if (response.length > 0) {
      setUploadedVideos(response);
      const videos = response.map((item) => {
        const { id, name, type } = item;
        return {
          id,
          combineStatus: false,
          order: 0,
          name,
          type,
        };
      });
      setVideosToCombine(videos);
    }
  }, [response]);

  function updateVideos(e) {
    const id = e.target.getAttribute("data-id");
    const videos = JSON.parse(JSON.stringify(videosToCombine));
    const index = videos.findIndex((vid) => vid.id === id);
    let value;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
      videos[index].combineStatus = value;
    } else {
      value = e.target.value;
      videos[index].order = value;
    }
    console.log(videos);
    setVideosToCombine(videos);
  }

  if (error) {
    return <div>{error}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    // console.log(response);
    const items = response.map((item) => {
      let mbytes = item.size / 1024 / 1024;
      mbytes = mbytes.toFixed(2);

      let isEnabled;
      let index;
      if (videosToCombine.length > 0) {
        index = videosToCombine.findIndex((vid) => {
          if (vid.id == item.id) return vid;
        });
        if (index != -1) isEnabled = videosToCombine[index].combineStatus;
      }
      // console.log(videosToCombine);
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.type}</td>
          <td>{item.date}</td>
          <td>{mbytes}</td>
          <td>
            <button
              className="remove-button"
              onClick={() =>
                removeDataFromDb(
                  item.id,
                  item.name,
                  item.type,
                  setUploadStatus,
                  setRandomNum
                )
              }
            >
              Remove
            </button>
          </td>
          <td>
            <input
              type="checkbox"
              data-id={item.id}
              checked={
                index != -1 ? videosToCombine[index].combineStatus : false
              }
              onChange={updateVideos}
            />
          </td>
          <td>
            <input
              data-id={item.id}
              type="number"
              min="1"
              disabled={!isEnabled}
              onChange={updateVideos}
              // value={videosToCombine[index].order}
            />
          </td>
        </tr>
      );
    });
    const table = (
      <table id="customers">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Date</th>
            <th>Size [MB]</th>
            <th>Remove</th>
            <th>Combine</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    );
    return (
      <div className="uploaded-videos">
        <h3>Uploaded Videos</h3>
        <p className="uploaded-videos__error-info">{uploadStatus}</p>
        <div className="uploaded-videos__results">
          {response.length > 0 ? table : "0 results"}
        </div>
      </div>
    );
  }
};

export default UploadedVideos;
