import React from "react";
import { removeFile } from "../../functions/removeFile.js";
import { apiURL } from "../../App.js";

const UploadedVideosTableRow = ({
  row,
  videosToCombine,
  setVideosToCombine,
  setStatus,
  setRandomNum,
  videoEl,
  setIsPlayerActive,
  mergingInProgress,
}) => {
  // console.log(mergingInProgress);
  // console.log(videosToCombine);
  const { id, name, type, size, resolution, url, userId } = row;
  const date = row.created_at.slice(0, 10);

  const mbytes = (size / 1024 / 1024).toFixed(2);

  //VIDEO IS SELECTED TO COMBINE
  let isEnabled;
  let index;
  if (videosToCombine.length > 0) {
    index = videosToCombine.findIndex((vid) => {
      if (vid.id == id) return vid;
    });
    if (index != -1) isEnabled = videosToCombine[index].combineStatus;
  }
  // VIDEO IS CURRENTLY MERGING
  let isMerging;
  if (mergingInProgress && mergingInProgress.length > 0) {
    isMerging = mergingInProgress.find((vid) => {
      if (vid.id == id) return vid;
    });
  }

  function handleInputChange(e) {
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
  function playVideo() {
    const fullName = name + "." + type;
    const path =
      "http://localhost/api/storage/app/videos-user-" + userId + "/" + fullName;
    // const path = url;
    console.log(url);
    videoEl.src = path;
    videoEl.autoplay = true;
    videoEl.muted = false;
    setIsPlayerActive(true);
  }
  // console.log(" row render");
  if (videosToCombine.length > 0) {
    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{type}</td>
        <td>{date}</td>
        <td>{mbytes}</td>
        <td>{resolution}</td>
        <td>
          <button onClick={playVideo}>Play</button>
        </td>

        <td>
          <button
            className="remove-button"
            onClick={() => removeFile(row, setStatus, setRandomNum)}
            disabled={isMerging}
          >
            Remove
          </button>
        </td>
        <td>
          <input
            type="checkbox"
            data-id={id}
            checked={index != -1 ? videosToCombine[index].combineStatus : false}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <input
            data-id={id}
            type="number"
            min="0"
            disabled={!isEnabled}
            onChange={handleInputChange}
            value={index != -1 ? videosToCombine[index].order : 0}
          />
        </td>
      </tr>
    );
  } else return <tr></tr>;
};

export default UploadedVideosTableRow;
