import React from "react";
const RecordedVideosTable = ({ rows }) => {
  if (rows.length > 0) {
    return (
      <table className="customers">
        <thead>
          <tr>
            <th>Name</th>
            <th>Size [MB]</th>
            <th>Remove</th>
            <th>Download</th>
            <th>Upload</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  } else return <p>0 results</p>;
};

export default RecordedVideosTable;
