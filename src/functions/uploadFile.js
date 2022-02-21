import { apiURL } from "../App.js";
import { checkVideoResolution } from "./checkVideoResolution";
import { insertIntoDb } from "./insertIntoDb";

export function uploadFile(item, setStatus, setRandomNum, videoEl) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log(xmlhttp.responseText);
      const data = JSON.parse(xmlhttp.responseText);
      //IF VIDEO IS UPLOADED AND RESOLUTION IS CHECKED - INSERT INTO DB
      // item.resolution = "600:700";
      if (data.video && item.resolution) {
        // console.log("1");
        data.video.resolution = item.resolution;
        insertIntoDb(data, setStatus, setRandomNum);
      } else if (data.video) {
        // console.log("2");
        function getVideoResolution(resolution) {
          data.video.resolution = resolution;
          insertIntoDb(data, setStatus, setRandomNum);
        }
        console.log(data.video);
        // const src = data.video.url;
        const src =
          "http://localhost/api/storage/app/videos-user-" +
          data.video.userId +
          "/" +
          data.video.name +
          "." +
          data.video.type;

        checkVideoResolution(src, videoEl, getVideoResolution);
      }
      //END OF INSERT INTO DB

      setStatus(data);
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

  // console.log(item);
  fd.append("video", item.blob, item.fullName);
  fd.append("type", item.type);
  fd.append("shortName", item.shortName);
  fd.append("resolution", item.resolution);
  fd.append("size", item.size);
  fd.append("userId", 34);
  xmlhttp.open("POST", apiURL + "api/upload");
  xmlhttp.send(fd);
}
