import React from 'react';

const FormSelect = ({ label, name, value, onChange, options }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <select name={name} value={value} onChange={onChange} id={name}>
      <option value="">اختر...</option> {/* Add a default option */}
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default FormSelect;
