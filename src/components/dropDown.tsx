import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledDropDown = styled.div`
  position: relative;
  width: 200px;
  color: var(--text);
  margin-bottom: 10px;

  &.open ul {
    max-height: 150px; /* height to expand to */
    border-bottom-left-radius: 10px; /* straight bottom-left when opened */
    border-bottom-right-radius: 10px; /* straight bottom-right when opened */
  }
  
  &.open .selected-option {
    border-bottom: 0;
    border-bottom-left-radius: 0; /* straight bottom-left when opened */
    border-bottom-right-radius: 0; /* straight bottom-right when opened */
  }
}
`;

const StyledSelectedOption = styled.div`
  padding: 10px;
  border: 2px solid;
  border-color: var(--text);
  cursor: pointer;
  border-radius: 10px;
  background-color: var(
    --card-bg
  ); /* Set background color to match the card's background */
  background-clip: padding-box; /* Ensures background doesn't extend under the border */
}
`;

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
    <StyledDropDown
      ref={dropdownRef}
      className={`${isOpen ? "open" : ""}`}
      id={id}
    >
      <StyledSelectedOption
        className="selected-option"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue}
      </StyledSelectedOption>
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
    </StyledDropDown>
  );
};

export default DropDown;
