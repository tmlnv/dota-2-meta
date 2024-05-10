import styled from "styled-components";

const ThemeSwitch = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  direction: rtl;
`;

const ThemeCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const Label = styled.label<{ checked: boolean }>`
  font-size: 2rem;
  height: 1em;
  width: 2.5em;
  border-radius: 0.25em;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  background-color: #cecece;
  background-color: ${(props) => (props.checked ? "#3a3a3a" : "#cecece")};
  position: relative;

  &:active {
    transform: scale(0.85);
    transition: transform 0.2s;
  }
`;

const ToggleSlider = styled.div<{ checked: boolean }>`
  width: 0.8em;
  height: 0.8em;
  border-radius: inherit;
  position: absolute;
  top: 0.1em;
  left: 0.1em;
  z-index: 10;
  transition: 0.5s cubic-bezier(1, 0.33, 0.11, 1.34);
  background-color: #f2f2f2;

  ${(props) => (props.checked ? "left: 1.6em; background-color: #212121" : "")}
`;

const Icon = styled.svg`
  display: inline-block;
  height: 1em;
  width: 1em;
  padding: 0.15em;
  box-sizing: border-box;
`;

export { ThemeSwitch, ThemeCheckbox, Label, ToggleSlider, Icon };
