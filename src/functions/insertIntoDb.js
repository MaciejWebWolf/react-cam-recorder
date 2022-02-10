import { apiURL } from "../App.js";

export function insertIntoDb(data, setStatus, setRandomNum) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //   console.log(xmlhttp.responseText);
      const data2 = JSON.parse(xmlhttp.responseText);
      const status = { error: data2.error, msg: data.msg + data2.msg };
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
  xmlhttp.open("POST", apiURL + "api/php/insertIntoDb.php");
  xmlhttp.send(fd);
}
