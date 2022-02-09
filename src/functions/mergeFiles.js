import { apiURL } from "../App";

export function mergeFiles(videos, name, resolution, setStatus, setRandomNum) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log(xmlhttp.responseText);
      const data = JSON.parse(xmlhttp.responseText);
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
  const json = JSON.stringify(videos);
  fd.append("videos", json);
  fd.append("outputName", name);
  fd.append("resolution", resolution);
  xmlhttp.open("POST", apiURL + "api/php/merge.php");
  xmlhttp.send(fd);
}
