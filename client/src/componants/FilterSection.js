import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FilterSection = ({ filters, onFilterChange }) => {
  const [buildings, setBuildings] = useState([]);
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/buildings'); // Replace with your buildings endpoint
        setBuildings(response.data);
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };

    const fetchOffices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/offices'); // Replace with your offices endpoint
        setOffices(response.data);
      } catch (error) {
        console.error("Error fetching offices:", error);
      }
    };

    fetchBuildings();
    fetchOffices();
  }, []);

  const handleChange = (e) => {
    onFilterChange(e.target.name, e.target.value);
  };

  return (
    <div className="filter-section">
      <input
        type="text"
        name="name"
        placeholder="ابحث بالاسم"
        value={filters.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="ابحث برقم الهاتف"
        value={filters.phone}
        onChange={handleChange}
      />
      <select name="building" value={filters.building} onChange={handleChange}>
        <option value="">كل المباني</option>
        {buildings.map(building => (
          <option key={building.id} value={building.name}>{building.name}</option>
        ))}
      </select>
      <select name="office" value={filters.office} onChange={handleChange}>
        <option value="">كل الادارات</option>
        {offices.map(office => (
          <option key={office.id} value={office.name}>{office.name}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterSection;
