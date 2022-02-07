import { apiURL } from "../App.js";

export function removeDataFromDb(
  id,
  name,
  type,
  setUploadStatus,
  setRandomNum
) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //do something if OK
      console.log(xmlhttp.responseText);
      const data = JSON.parse(xmlhttp.responseText);
      console.log(data);
      setUploadStatus(data.msg);
      if (!data.error) {
        setRandomNum(Math.random());
      }
    }
  };
  const data = { id, name, type };
  const json = JSON.stringify(data);
  xmlhttp.open("POST", apiURL + "api/php/removeDataFromDb.php");
  xmlhttp.send(json);
}
