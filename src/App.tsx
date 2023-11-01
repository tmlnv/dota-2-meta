import Cards from "./components/cards";
import ColorThemeToggleButton from "./components/colorThemeButton";
import GitHubButton from "./components/gitHubButton";

function App() {
  return (
    <>
      <Cards />
      <footer>
        <ColorThemeToggleButton />
        <GitHubButton />
      </footer>
    </>
  );
}

export default App;
