import React, { useState, useEffect } from 'react';

import BuildingForm from '../componants/BuildingForm';
import OfficeForm from '../componants/OfficeForm';
import EmployeeForm from '../componants/EmployeeForm';
import BuildingTable from '../componants/BuildingTable';

import axios from 'axios';

import './Dashboard.css'; 
 

const Dashboard = () => {
  const [buildings, setBuildings] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBuildings();
    fetchEmployees();
  }, []);

  const fetchBuildings = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/buildings');
      setBuildings(response.data);
    } catch (error) {
      console.error("Error fetching buildings:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleEditEmployee = (employee) => {
    // Logic to edit employee
  };

  const handleDeleteEmployee = (employeeId) => {
    setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== employeeId));
  };

  return (
    <div className="dashboard">
      <div className="inputs">
        <BuildingForm buildings={buildings} setBuildings={setBuildings} />
        <OfficeForm buildings={buildings} setBuildings={setBuildings} />
        <EmployeeForm buildings={buildings} setEmployees={setEmployees} employees={employees} />
      </div>

      <div className="displays">
        <h4>تحديث معلومات الموظفين</h4>

        <div className="search-section">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search employees"
          />
        </div>

        <BuildingTable
          buildings={buildings}
          employees={employees}
          handleEditEmployee={handleEditEmployee}
          handleDeleteEmployee={handleDeleteEmployee}
        />
      </div>
    </div>
  );
};

export default Dashboard;