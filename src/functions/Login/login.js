import { apiURL } from "../../App.js";

export function login(creds, setStatus, setIsLogged) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //   console.log(xmlhttp.responseText);
      const data = JSON.parse(xmlhttp.responseText);
      setStatus(data);
      if (!data.error) {
        console.log("logged in");
        setIsLogged(true);
      }
    } else if (xmlhttp.readyState == 4) {
      const data = JSON.parse(xmlhttp.responseText);
      setStatus(data);
    }
  };
  setStatus("loading");
  const fd = new FormData();
  fd.append("email", creds.email);
  fd.append("password", creds.password);
  xmlhttp.open("POST", apiURL + "api/login");
  xmlhttp.send(fd);
}
