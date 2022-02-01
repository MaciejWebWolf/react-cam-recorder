export function uploadFile(item, e, setUploadStatus, setRandomNum) {
  e.preventDefault();
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

  console.log(item);
  const fd = new FormData();
  fd.append("video", item.file, item.fullName);
  fd.append("shortName", item.shortName);
  xmlhttp.open("POST", "http://localhost/api/php/uploadFile.php");
  xmlhttp.send(fd);
}
