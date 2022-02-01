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
      const data = JSON.parse(xmlhttp.responseText);
      console.log(data);
      setUploadStatus(data.msg);
      if (!data.error) {
        setRandomNum(Math.random());
      }
    }
  };
  const format = type.substring(type.indexOf("/") + 1);
  const data = { id, name, format };
  const json = JSON.stringify(data);
  xmlhttp.open("POST", "http://localhost/api/php/removeDataFromDb.php");
  xmlhttp.send(json);
}
