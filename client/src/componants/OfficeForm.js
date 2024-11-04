import React, { useState } from 'react';
import axios from 'axios';

const OfficeForm = ({ buildings, setBuildings }) => {
  const [officeName, setOfficeName] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');

  const handleAddOffice = async () => {
    if (officeName && selectedBuilding) {
      const building = buildings.find((b) => b.name === selectedBuilding);
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/offices', {
          name: officeName,
          building_id: building.id,
        });
        
        // Update the buildings state with the new office
        setBuildings((prevBuildings) =>
          prevBuildings.map((b) =>
            b.id === building.id
              ? { ...b, offices: [...(b.offices || []), response.data] }
              : b
          )
        );

        setOfficeName('');
        setSelectedBuilding('');
      } catch (error) {
        console.error("Error adding office:", error);
      }
    }
  };

  return (
    <div className="form-section">
      <h4>اضف اداره</h4>
      <select
        value={selectedBuilding}
        onChange={(e) => setSelectedBuilding(e.target.value)}
      >
        <option value="">اختر مبني</option>
        {buildings.map((building) => (
          <option key={building.id} value={building.name}>
            {building.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={officeName}
        onChange={(e) => setOfficeName(e.target.value)}
        placeholder="اسم الإدارة"
      />
      <button onClick={handleAddOffice}>اضف</button>
    </div>
  );
};

export default OfficeForm;
