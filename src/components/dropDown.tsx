import React, { useEffect, useRef, useState } from 'react';

interface DropDownProps {
    id: string;
    dataValue: string[];
}

const DropDown: React.FC<DropDownProps> = ({ id, dataValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('All');
  const dropdownRef = useRef(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`dropdown ${isOpen ? 'open' : ''}`} id={id}>
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {selectedValue}
      </div>
      <ul className={`options-list ${isOpen ? '' : 'hidden'}`}>
        {dataValue.map((value, index) => (
          <li
            key={index}
            data-value={value}
            onClick={() => {
              setSelectedValue(value);
              setIsOpen(false);
            }}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
