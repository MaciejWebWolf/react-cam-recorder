import { apiURL } from "../App.js";
import { removeFromDb } from "./removeFromDb.js";

export function removeFile(video, setStatus, setRandomNum) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log(xmlhttp.responseText);
      const data = JSON.parse(xmlhttp.responseText);
      setStatus(data);
      if (!data.error) {
        removeFromDb(data, setStatus, setRandomNum);
      }
    }
  };
  setStatus("loading");
  const fd = new FormData();
  const json = JSON.stringify(video);
  fd.append("video", json);
  xmlhttp.open("POST", apiURL + "api/remove");
  xmlhttp.send(fd);
}
