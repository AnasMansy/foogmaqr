// SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="ابحث بالاسم او الهاتف"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
    <button onClick={handleSearch} className="search-button">
      <i className="fas fa-search button-icon"></i> بحث
    </button>
  </div>
);

export default SearchBar;
