import { apiURL } from "../App.js";

import React, { useState } from "react";
const FileMerger = ({ videosToCombine, uploadedVideos }) => {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");

  function merge(e) {
    e.preventDefault();
    if (name === "") return setInfo("Output file name is missing");
    const nameAlreadyExists = uploadedVideos.find((vid) =>
      vid.name === name ? vid : null
    );
    if (nameAlreadyExists)
      return setInfo(`File with name "${name}" already exists.`);
    const zeroVideosChosen = videosToCombine.find((vid) =>
      vid.combineStatus == true ? vid : null
    );
    if (!zeroVideosChosen) return setInfo("You did not select any video");

    setInfo("");

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log(xmlhttp.responseText);
      }
    };
    xmlhttp.onerror = (error) => {
      console.log(error);
    };

    // console.log(videosToCombine);
    const videos = videosToCombine.filter((vid) =>
      vid.combineStatus ? vid : null
    );
    // console.log(videos);

    const fd = new FormData();
    videos.sort((a, b) => a.order - b.order);
    const json = JSON.stringify(videos);
    fd.append("videos", json);
    fd.append("outputName", name);
    xmlhttp.open("POST", apiURL + "api/php/merge.php");
    xmlhttp.send(fd);
  }

  if (uploadedVideos.length > 0) {
  }

  return (
    <div className="combine-videos">
      <h3>Combine videos</h3>
      <form method="POST" onSubmit={merge} className="combine-videos__form">
        Output file name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="submit" value="Combine selected videos" />
        <p className="combine-videos__info">{info}</p>
      </form>
    </div>
  );
};

export default FileMerger;
