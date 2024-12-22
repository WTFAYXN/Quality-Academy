import React, { useState } from "react";
import "./FilterResource.css"; // Import your CSS file here

const FilterResource = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="filter-resources">
      <button id="filter-drop" onClick={toggleDropdown}>
        Filters
      </button>
      <div className={`filter-dropdown ${isVisible ? "visible" : ""}`}>
        <div className="alphabetically">
          <label>Alphabetically</label>
          <ul className="alphabet">
            {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].map(
              (letter) => (
                <li key={letter}>
                  <a>{letter}</a>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="ascending-decending">
          <label>Ascending-Descending</label>
          <label>Descending-Ascending</label>
        </div>
        <div className="category-resource">
          <label>Category</label>
          <select>
            <option>All</option>
            <option>Tech</option>
            <option>Math</option>
            <option>Law</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterResource;
