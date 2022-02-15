import { apiURL } from "../App";
import { checkVideoResolution } from "./checkVideoResolution";
import { insertIntoDb } from "./insertIntoDb";

export function mergeFiles(
  videos,
  name,
  resolution,
  radioChoice,
  setStatus,
  setRandomNum,
  videoEl
) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log(xmlhttp.responseText);
      const data = JSON.parse(xmlhttp.responseText);
      setStatus(data);

      //IF VIDEO IS UPLOADED AND RESOLUTION IS CHECKED - INSERT INTO DB
      if (data.video) {
        function getVideoResolution(resolution) {
          data.video.resolution = resolution;
          insertIntoDb(data, setStatus, setRandomNum);
        }
        const src =
          apiURL + "api/uploads/" + data.video.name + "." + data.video.type;
        checkVideoResolution(src, videoEl, getVideoResolution);
      }
      //END OF INSERT INTO DB

      if (!data.error) {
        setRandomNum(Math.random());
      }
    }
  };
  xmlhttp.onerror = (error) => {
    console.log(error);
  };
  setStatus("loading");
  const fd = new FormData();
  const json = JSON.stringify(videos);
  fd.append("inputVideos", json);
  fd.append("outputName", name);
  fd.append("outputResolution", resolution);
  fd.append("radioChoice", radioChoice);
  xmlhttp.open("POST", apiURL + "api/php/merge.php");
  xmlhttp.send(fd);
}
