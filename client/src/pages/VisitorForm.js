import React, { useState, useEffect } from 'react';
import './VisitorForm.css';
import SearchBar from '../componants/visitForm/SearchBar';
import Notification from '../componants/visitForm/Notification';
import FormInput from '../componants/visitForm/FormInput';
import FormSelect from '../componants/visitForm/FormSelect';




const VisitorForm = () => {
  const initialFormData = {
    id: null,
    name: '',
    phone: '',
    building_id: '',
    office_id: '',
    employee_id: '', // Updated to match the JSON format
    reason: '',
    company: ''
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [visitorData, setVisitorData] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [buildingsData, setBuildingsData] = useState([]);
  const [officesData, setOfficesData] = useState([]);
  const [employeesData, setEmployeesData] = useState([]);
  const [notification, setNotification] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const officesResponse = await fetch('http://127.0.0.1:8000/api/offices');
        const offices = await officesResponse.json();
        setOfficesData(offices);

        const employeesResponse = await fetch('http://127.0.0.1:8000/api/employees');
        const employees = await employeesResponse.json();
        setEmployeesData(employees);

        const buildingsResponse = await fetch('http://127.0.0.1:8000/api/buildings');
        const buildings = await buildingsResponse.json();
        setBuildingsData(buildings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchVisitors = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/visitors');
      const data = await response.json();
      setVisitorData(data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  const handleSearch = () => {
    const visitor = visitorData.find(v =>
      v.name.toLowerCase() === searchTerm.toLowerCase() || v.phone === searchTerm
    );
    if (visitor) {
      setFormData(visitor);
      setIsEditing(true);
      setSearchTerm('');
    } else {
      alert("Visitor not found.");
    }
  };

  const filteredOffices = officesData.filter(office => office.building_id === Number(formData.building_id));
  const filteredEmployees = employeesData.filter(employee => employee.office_id === Number(formData.office_id));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateVisitor(formData);
    } else {
      await addVisitor(formData);
    }
    fetchVisitors();
    resetForm();
  };

  const addVisitor = async (visitor) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitor),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Visitor added:', data);
        setNotification('New visitor added');
      } else {
        const errorData = await response.json();
        console.error('Error adding visitor:', errorData);
        setNotification('Error adding visitor');
      }
    } catch (error) {
      console.error('Error adding visitor:', error);
      setNotification('Error adding visitor');
    }
  };

  const updateVisitor = async (visitor) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/visitors/${visitor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitor),
      });
      if (response.ok) {
        setNotification('Visitor updated successfully');
      } else {
        setNotification('Error updating visitor');
      }
    } catch (error) {
      console.error('Error updating visitor:', error);
      setNotification('Error updating visitor');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this visitor?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/visitors/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setVisitorData(visitorData.filter(v => v.id !== id));
          setNotification('Visitor deleted');
        } else {
          setNotification('Error deleting visitor');
        }
      } catch (error) {
        console.error('Error deleting visitor:', error);
        setNotification('Error deleting visitor');
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setIsEditing(false);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="visitor-form-container">
      <div className="search-section">
        <h1>تسجيل عميل</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
        <Notification message={notification} />
      </div>

      <form onSubmit={handleSubmit} className="visitor-form">
        <FormInput label="الاسم" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="ادخل الاسم" />
        <FormInput label="الهاتف" type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="رقم الهاتف" />
        <FormSelect
          label="المبنى"
          name="building_id"
          value={formData.building_id}
          onChange={handleChange}
          options={buildingsData.map(building => ({ value: building.id, label: building.name }))}
        />
        <FormSelect
          label="المكتب"
          name="office_id"
          value={formData.office_id}
          onChange={handleChange}
          options={filteredOffices.map(office => ({ value: office.id, label: office.name }))}
        />
        <FormSelect
          label="الموظف"
          name="employee_id"
          value={formData.employee_id}
          onChange={handleChange}
          options={filteredEmployees.map(employee => ({ value: employee.id, label: employee.name }))}
        />
        <FormInput label="سبب الزياره" type="text" name="reason" value={formData.reason} onChange={handleChange} placeholder="السبب" />
        <FormInput label="اسم الشركه" type="text" name="company" value={formData.company} onChange={handleChange} placeholder="اسم الشركه" />

        <button type="submit" className="submit-button">
          {isEditing ? 'تحديث' : 'سجل'}
        </button>
        {isEditing && (
          <button type="button" onClick={() => handleDelete(formData.id)} className="delete-button">
            حذف
          </button>
        )}
      </form>
    </div>
  );
};

export default VisitorForm;
