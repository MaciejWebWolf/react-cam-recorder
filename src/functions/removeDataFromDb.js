import { apiURL } from "../App.js";

export function removeDataFromDb(item, setStatus, setRandomNum) {
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
  setStatus("loading");
  const fd = new FormData();
  const json = JSON.stringify(item);
  fd.append("video", json);
  xmlhttp.open("POST", apiURL + "api/php/removeDataFromDb.php");
  xmlhttp.send(fd);
}
