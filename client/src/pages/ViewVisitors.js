import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './ViewVisitors.css';
import FilterSection from '../componants/FilterSection';
import VisitorTable from '../componants/VisitorTable';
import logo from '../images/logo.png';

 
const ViewVisitors = () => {
  const [visitors, setVisitors] = useState([]); // Store full visitors data
  const [filteredVisitors, setFilteredVisitors] = useState([]); // Store filtered visitors data
  const [filters, setFilters] = useState({
    name: '',
    building: '',
    office: '',
    date: ''
  });

  // Fetch visitors from the API
  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/visitors');
        setVisitors(response.data);
        setFilteredVisitors(response.data);
        console.log(response.data); // Log the response for debugging
      } catch (error) {
        console.error("Error fetching visitors:", error);
      }
    };
    fetchVisitors();
  }, []);

  // Update filtered visitors when filters change
  useEffect(() => {
    const filtered = visitors.filter(visitor => {
      return (
        (!filters.name || visitor.name.includes(filters.name)) &&
        (!filters.building || visitor.building.name.includes(filters.building)) &&
        (!filters.office || visitor.office.name.includes(filters.office)) &&
        (!filters.date || new Date(visitor.created_at).toISOString().split('T')[0] === filters.date) // Adjusted for date filtering
      );
    });
    setFilteredVisitors(filtered);
  }, [filters, visitors]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Add a new visitor
  const addVisitor = async (newVisitor) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/visitors', newVisitor);
      setVisitors(prevVisitors => [...prevVisitors, response.data]); // Update full visitors list
      setFilteredVisitors(prevFiltered => [...prevFiltered, response.data]); // Update filtered visitors list
    } catch (error) {
      console.error("Error adding visitor:", error);
    }
  };

  return (
    <div className="view-visitors-container">
      <h1>عرض العملاء</h1>
      <FilterSection filters={filters} onFilterChange={handleFilterChange} />
      <VisitorTable visitors={filteredVisitors} />
      {/* Button to add a new visitor for testing */}
      <button onClick={() => addVisitor({
        name: 'New Visitor',
        phone: '123456789',
        building_id: 1,
        office_id: 1,
        reason: 'Testing', // Updated to include reason
        company: 'Test Company' // Added company for testing
      })}>
        Add Visitor
      </button>
    </div>
  );
};

export default ViewVisitors;
