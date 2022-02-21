import { apiURL } from "../App.js";

export function getDataFromDb(setError, setIsLoaded, setResponse) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const data = JSON.parse(xmlhttp.responseText);
      setResponse(data);
      setIsLoaded(true);
    }
  };
  xmlhttp.onerror = (error) => {
    setError(error);
    setIsLoaded(true);
  };

  xmlhttp.open("GET", apiURL + "api/videos");
  xmlhttp.send();
}
