import React, { useEffect, useState } from "react";
import { getDataFromDb } from "../functions/getDataFromDb.js";
import { removeDataFromDb } from "../functions/removeDataFromDb.js";

const UploadedVideos = ({ randomNum }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [response, setResponse] = useState([]);
  const [num, setRandomNum] = useState(randomNum);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    console.log("useeffect");
    getDataFromDb(setError, setIsLoaded, setResponse);
  }, [num, randomNum]);

  if (error) {
    return <div>{error}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    console.log(response);
    const items = response.map((item) => {
      let mbytes = item.size / 1024 / 1024;
      mbytes = mbytes.toFixed(2);
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.type}</td>
          <td>{item.date}</td>
          <td>{mbytes}</td>
          <td>
            <button
              className="remove-button"
              id={item.id}
              data-name={item.name}
              data-type={item.type}
              onClick={() =>
                removeDataFromDb(
                  item.id,
                  item.name,
                  item.type,
                  setUploadStatus,
                  setRandomNum
                )
              }
            >
              Remove
            </button>
          </td>
        </tr>
      );
    });
    const table = (
      <table id="customers">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Date</th>
            <th>Size [MB]</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    );
    return (
      <div className="uploaded-videos">
        <h3>Uploaded Videos</h3>
        <p className="uploaded-videos__error-info">{uploadStatus}</p>
        <div className="uploaded-videos__results">
          {response.length > 0 ? table : "0 results"}
        </div>
      </div>
    );
  }
};

export default UploadedVideos;
