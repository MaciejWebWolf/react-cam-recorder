import React from "react";
import { removeDataFromDb } from "../../functions/removeDataFromDb.js";

const UploadedVideosTableRow = ({
  row,
  videosToCombine,
  setVideosToCombine,
  setStatus,
  setRandomNum,
}) => {
  const { id, name, type, size, date } = row;
  const item = { id, name, type };

  let mbytes = size / 1024 / 1024;
  mbytes = mbytes.toFixed(2);

  let isEnabled;
  let index;
  if (videosToCombine.length > 0) {
    index = videosToCombine.findIndex((vid) => {
      if (vid.id == id) return vid;
    });
    if (index != -1) isEnabled = videosToCombine[index].combineStatus;
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
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{type}</td>
      <td>{date}</td>
      <td>{mbytes}</td>
      <td>
        <button
          className="remove-button"
          onClick={() => removeDataFromDb(item, setStatus, setRandomNum)}
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
};

export default UploadedVideosTableRow;