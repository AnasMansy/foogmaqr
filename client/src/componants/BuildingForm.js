import React, { useState } from 'react';
import axios from 'axios';

const BuildingForm = ({ setBuildings }) => {
  const [buildingName, setBuildingName] = useState('');

  const addBuilding = async () => {
    if (buildingName) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/buildings', { name: buildingName });
        setBuildings((prev) => [...prev, response.data]); // Update local state with the new building
        setBuildingName('');
      } catch (error) {
        console.error("Error adding building:", error);
      }
    }
  };

  return (
    <div className="form-section">
      <h4>اضف مبني</h4>
      <input
        type="text"
        value={buildingName}
        onChange={(e) => setBuildingName(e.target.value)}
        placeholder="اسم المبني"
      />
      <button onClick={addBuilding}>اضف</button>
    </div>
  );
};

export default BuildingForm;
