import React, { useState, useEffect, useRef } from "react";
import "./FilterResource.css"; // Import your CSS file here

const FilterResource = ({ onApplyFilter }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [alphabetFilter, setAlphabetFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const popupRef = useRef(null);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  const handleApplyFilter = () => {
    onApplyFilter({ alphabetFilter, sortOrder });
    setIsVisible(false);
  };

  const handleClearFilter = () => {
    setAlphabetFilter("");
    setSortOrder("asc");
    onApplyFilter({ alphabetFilter: "", sortOrder: "asc" });
    setIsVisible(false);
  };

  return (
    <>
      <button id="filter-drop" onClick={toggleDropdown}>
        Filters
      </button>
      {isVisible && (
        <div className="filter-popup-overlay">
          <div className="filter-popup" ref={popupRef}>
            <h2>Filter Resources</h2>
            <div className="filter-options">
              <div className="filter-option">
                <label>Alphabetically</label>
                <ul className="alphabet">
                  {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].map(
                    (letter) => (
                      <li key={letter}>
                        <button
                          className={`alphabet-button ${alphabetFilter === letter ? "active" : ""}`}
                          onClick={() => setAlphabetFilter(letter)}
                        >
                          {letter}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="filter-option">
                <label>Ascending-Descending</label>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
            <div className="filter-buttons">
              <button className="apply-btn" onClick={handleApplyFilter}>Apply Filter</button>
              <button className="clear-btn" onClick={handleClearFilter}>Clear Filter</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterResource;