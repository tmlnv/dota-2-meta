import React, { useEffect, useRef, useState } from "react";

interface DropDownProps {
  id: string;
  dataValue: string[];
  initialValue?: string;
  onValueChange?: (newValue: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  id,
  dataValue,
  initialValue = "All",
  onValueChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${isOpen ? "open" : ""}`}
      id={id}
    >
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {selectedValue}
      </div>
      <ul className={`options-list ${isOpen ? "" : "hidden"}`}>
        {dataValue.map((value, index) => (
          <li
            key={index}
            data-value={value}
            onClick={() => {
              handleValueChange(value);
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
