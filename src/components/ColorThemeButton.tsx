import { useEffect, useState } from "react";
import StyledButton from "../styles/colorThemeButton";

const ColorThemeToggleButton = () => {
  const [dark, setDark] = useState(() => {
    // Check the user's preference in localStorage first
    const savedTheme = localStorage.getItem("dark");
    if (savedTheme !== null) {
      return savedTheme === "true";
    }
    // If no preference is saved, check the system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark;
  });

  // Update the document body and localStorage whenever the theme changes
  useEffect(() => {
    document.body.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);

  // Toggle between dark and light modes
  const toggleTheme = () => {
    setDark((prevDark) => !prevDark);
  };

  return (
    <StyledButton onClick={toggleTheme}>
      Switch Color Theme
    </StyledButton>
  );
};

export default ColorThemeToggleButton;
