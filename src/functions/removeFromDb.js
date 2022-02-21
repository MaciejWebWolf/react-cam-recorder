import { apiURL } from "../App.js";

export function removeFromDb(data, setStatus, setRandomNum) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //   console.log(xmlhttp.responseText);
      const response = JSON.parse(xmlhttp.responseText);
      const status = { error: response.error, msg: data.msg + response.msg };
      setStatus(status);
      if (!data.error) {
        setRandomNum(Math.random());
      }
    }
  };
  setStatus("loading");
  const fd = new FormData();
  const json = JSON.stringify(data.video);
  fd.append("video", json);
  xmlhttp.open("DELETE", apiURL + "api/videos/" + data.video.id);
  xmlhttp.send(fd);
}
