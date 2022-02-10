import React from "react";
const UploadedVideosTable = ({ rows }) => {
  if (rows.length > 0) {
    return (
      <table className="customers">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Date</th>
            <th>Size [MB]</th>
            <th>Resolution</th>
            <th>Play</th>
            <th>Remove</th>
            <th>Combine</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  } else return <p>0 results</p>;
};

export default UploadedVideosTable;
