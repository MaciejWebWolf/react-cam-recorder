import { apiURL } from "../App.js";

export function uploadFile(item, setStatus, setRandomNum) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //console.log(xmlhttp.responseText);
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
  fd.append("video", item.blob, item.fullName);
  fd.append("type", item.type);
  fd.append("shortName", item.shortName);
  xmlhttp.open("POST", apiURL + "api/php/uploadFile.php");
  xmlhttp.send(fd);
}
