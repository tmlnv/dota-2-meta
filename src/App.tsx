import { ThemeProvider } from "styled-components";
import Cards from "./components/Cards";
import ColorThemeToggleButton from "./components/ColorThemeButton";
import GitHubButton from "./components/GitHubButton";
import StyledFooter from "./styles/footer";
import GlobalStyle from "./styles/global";
import theme from "./styles/theme";

function App() {
  return (
    <>
    <ThemeProvider theme = {theme}>
    <GlobalStyle />
      <Cards />
      <StyledFooter>
        <ColorThemeToggleButton />
        <GitHubButton />
      </StyledFooter>
      </ThemeProvider>
    </>
  );
}

export default App;
