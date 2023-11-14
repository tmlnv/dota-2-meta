import styled from "styled-components";

const StyledDropDown = styled.div`
  position: relative;
  width: 200px;
  color: var(--text);
  margin-bottom: 10px;

  &.open ul {
    max-height: 200px; /* height to expand to */
    border-bottom-left-radius: 10px; /* straight bottom-left when opened */
    border-bottom-right-radius: 10px; /* straight bottom-right when opened */
  }
  
  &.open .selected-option {
    border-bottom: 0;
    border-bottom-left-radius: 0; /* straight bottom-left when opened */
    border-bottom-right-radius: 0; /* straight bottom-right when opened */
  }

  @media ${props => props.theme.media.phone} {
    width: 100%;
    align-self: right;
    max-width: 300px; /* this ensures it doesn't get too wide on landscape phones or larger screens within this media query range */
    min-width: 25vw;
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

const StyledUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  border-bottom: 2px solid;
  border-left: 2px solid;
  border-right: 2px solid;
  border-color: (--text);
  border-top: none; /* Remove top border */
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.1s ease-in-out;
  overflow-y: auto;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  position: absolute;
  width: 100%;
  z-index: 10; /* This will ensure the dropdown appears above other elements */
  top: 100%; /* Positioning it right below the .selected-option element */

  background-color: var(--card-bg);
  margin-top: -2px; /* Overlap the ul border over the .selected-option bottom border */
  background-clip: padding-box; /* Ensures background doesn't extend under the border */

  &.hidden {
    border: 0px;
  }
}
`;

const StyledLi = styled.li`
  padding: 10px;
  cursor: pointer;


  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  &:hover {
    background-color: #e9e9e9;
    color: #ff5500;
  }
`;

export { StyledDropDown, StyledLi, StyledSelectedOption, StyledUl };
