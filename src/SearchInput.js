import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [input, setInput] = useState('');

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search location"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSearch(input)}
      />
      <button onClick={() => onSearch(input)} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchInput;
