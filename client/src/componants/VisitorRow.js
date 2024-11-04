// src/pages/VisitorRow.js
import React from 'react';

const VisitorRow = ({ visitor }) => {
  return (
    <tr>
      <td>{visitor.name}</td>
      <td>{visitor.phone}</td>
      <td>{visitor.building}</td>
      <td>{visitor.office}</td>
      <td>{visitor.employee}</td>
      <td>{visitor.nationalID}</td>
    </tr>
  );
};

export default VisitorRow;
