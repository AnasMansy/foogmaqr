import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = ({ buildings = [], setEmployees, employees }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedOffice, setSelectedOffice] = useState('');
  const [offices, setOffices] = useState([]); // State to store offices

  // Fetch all offices when the component mounts
  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/offices'); // Adjust the endpoint as necessary
        setOffices(response.data); // Store the fetched offices in state
        console.log(response.data); // Print the fetched offices
      } catch (error) {
        console.error("Error fetching offices:", error);
      }
    };

    fetchOffices();
  }, []);

  const handleAddEmployee = async () => {
    if (employeeName && selectedBuilding && selectedOffice) {
      const building = buildings.find((b) => b.name === selectedBuilding);
      
      // Safely check for building and office before proceeding
      if (!building) {
        console.error('Building not found');
        return;
      }

      const office = offices.find((o) => o.name === selectedOffice);
      if (!office) {
        console.error('Office not found');
        return;
      }

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/employees', {
            name: employeeName,
            building_id: building.id,
            office_id: office.id,
        });

        const newEmployee = {
          id: response.data.id,
          name: response.data.name,
          building_id: building.id,
          office_id: office.id,
          created_at: response.data.created_at,
          updated_at: response.data.updated_at,
        };

        setEmployees((prev) => [...prev, newEmployee]);
        setEmployeeName('');
        setSelectedBuilding('');
        setSelectedOffice('');
      } catch (error) {
        console.error("Error adding employee:", error.response ? error.response.data : error.message);
      }
    } else {
      console.error('All fields are required');
    }
  };

  return (
    <div className='form-section'>
      <h4>اضافه موظف</h4>
      {/*sellect employee name*/}
      <input
        type="text"
        value={employeeName}
        onChange={(e) => setEmployeeName(e.target.value)}
        placeholder="اسم الموظف"
      />

         {/*sellect building name*/}
      <select
        value={selectedBuilding}
        onChange={(e) => {
          setSelectedBuilding(e.target.value);
          setSelectedOffice(''); // Reset office when building changes
        }}
      >
        <option value="">اختر مبني</option>
        {buildings.map((building) => (
          <option key={building.id} value={building.name}>
            {building.name}
          </option>
        ))}
      </select>
         {/*sellect office name*/}
      <select
        value={selectedOffice}
        onChange={(e) => setSelectedOffice(e.target.value)}
        disabled={!selectedBuilding}
      >
        <option value="">اختر اداره</option>
        {selectedBuilding &&
          offices
            .filter((office) => office.building_id === buildings.find(b => b.name === selectedBuilding).id)
            .map((office) => (
              <option key={office.id} value={office.name}>
                {office.name}
              </option>
            )) || <option disabled>No offices available</option>}
      </select>
      <button onClick={handleAddEmployee}>اضف</button>
    </div>
  );
};

export default EmployeeForm;
