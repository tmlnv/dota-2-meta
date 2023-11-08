import Cards from "./components/Cards";
import ColorThemeToggleButton from "./components/ColorThemeButton";
import GitHubButton from "./components/GitHubButton";

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
