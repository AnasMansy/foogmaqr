import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BuildingTable = ({ buildings }) => {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [employeeName, setEmployeeName] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedOffice, setSelectedOffice] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/employees'); // Fetch employees
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDeleteEmployee = async (employeeId) => {
    const confirmDelete = window.confirm("هل تريد حذف الموظف بشكل نهائي؟");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/employees/${employeeId}`); // Adjust the endpoint as necessary
        setEmployees((prev) => prev.filter((employee) => employee.id !== employeeId)); // Update the state
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleEditEmployee = (employee) => {
    setIsEditing(true);
    setCurrentEmployee(employee);
    setEmployeeName(employee.name);
    setSelectedBuilding(employee.building.name);
    setSelectedOffice(employee.office.name);
  };

  const handleUpdateEmployee = async () => {
    if (employeeName && selectedBuilding && selectedOffice) {
      const building = buildings.find((b) => b.name === selectedBuilding);
      const office = building.offices.find((o) => o.name === selectedOffice);

      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/employees/${currentEmployee.id}`, {
          name: employeeName,
          building_id: building.id,
          office_id: office.id,
        });

        const updatedEmployee = {
          ...currentEmployee,
          name: response.data.name,
          building_id: building.id,
          office_id: office.id,
        };

        setEmployees((prev) =>
          prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
        );
        resetForm();
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    } else {
      console.error('All fields are required');
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentEmployee(null);
    setEmployeeName('');
    setSelectedBuilding('');
    setSelectedOffice('');
  };

  return (
    <div>
      <h2>قائمه الموظفين</h2>
      {isEditing ? (
        <div>
          <h3>Edit Employee</h3>
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="Employee Name"
          />
          <select
            value={selectedBuilding}
            onChange={(e) => {
              setSelectedBuilding(e.target.value);
              setSelectedOffice(''); // Reset office when building changes
            }}
          >
            <option value="">Select Building</option>
            {buildings.map((building) => (
              <option key={building.id} value={building.name}>
                {building.name}
              </option>
            ))}
          </select>
          <select
            value={selectedOffice}
            onChange={(e) => setSelectedOffice(e.target.value)}
            disabled={!selectedBuilding}
          >
            <option value="">Select Office</option>
            {selectedBuilding &&
              buildings.find((b) => b.name === selectedBuilding)?.offices?.map((office) => (
                <option key={office.id} value={office.name}>
                  {office.name}
                </option>
              )) || <option disabled>لا يوجد ادارات متاحه</option>}
          </select>
          <button onClick={handleUpdateEmployee}>Update</button>
          <button onClick={resetForm}>Cancel</button>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>الاسم</th>
              <th>المبني</th>
              <th>الاداره</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.building ? employee.building.name : 'N/A'}</td>
                <td>{employee.office ? employee.office.name : 'N/A'}</td>
                <td>
                  <button onClick={() => handleEditEmployee(employee)}>تعديل</button>
                  <button onClick={() => handleDeleteEmployee(employee.id)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BuildingTable;
