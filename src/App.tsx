import Cards from "./components/Cards";
import ColorThemeToggleButton from "./components/ColorThemeButton";
import GitHubButton from "./components/GitHubButton";
import GlobalStyle from "./styles/global";

function App() {
  return (
    <>
    <GlobalStyle />
      <Cards />
      <footer>
        <ColorThemeToggleButton />
        <GitHubButton />
      </footer>
    </>
  );
}

export default App;
