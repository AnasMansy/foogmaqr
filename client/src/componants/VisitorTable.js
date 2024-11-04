import React from 'react';

const VisitorTable = ({ visitors }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Building</th>
          <th>Office</th>
          <th>Reason</th>
          <th>Employee</th>
        </tr>
      </thead>
      <tbody>
        {visitors.length > 0 ? (
          visitors.map(visitor => (
            <tr key={visitor.id}>
              <td>{visitor.name}</td>
              <td>{new Date(visitor.created_at).toLocaleDateString('en-US')} {/* Formatting date */}</td>
              <td>{visitor.building ? visitor.building.name : 'N/A'}</td> {/* Accessing building name safely */}
              <td>{visitor.office ? visitor.office.name : 'N/A'}</td> {/* Accessing office name safely */}
              <td>{visitor.reason}</td> {/* Updated to match the API response */}
              <td>{visitor.employee ? visitor.employee.name : 'N/A'}</td> {/* Accessing employee name safely */}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" style={{ textAlign: 'center' }}>No visitors found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default VisitorTable;

