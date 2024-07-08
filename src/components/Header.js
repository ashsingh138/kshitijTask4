import React, { useState } from 'react';

const Header = ({ onSearch, onSave }) => {
  const [location, setLocation] = useState('');

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(location);
  };

  const handleSaveClick = () => {
    onSave(location);
  };

  return (
    <header>
      <nav>
        <h1>Weather App</h1>
        <div>
          <input
            type="text"
            value={location}
            onChange={handleInputChange}
            placeholder="Enter location"
          />
          <button onClick={handleSearchClick}>Search</button>
          <button onClick={handleSaveClick}>Save Location</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
