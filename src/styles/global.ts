import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
    box-sizing: border-box;
    }

    :root {
    --light-bg: #fafafa;
    --light-text: #333;
    --light-card-bg: #f0f0f0;
    --dark-bg: #222;
    --dark-text: #f0f0f0;
    --dark-card-bg: #333;
    --card-bg: var(--light-card-bg);
    }

    body,
    html {
    margin: 0;
    padding: 0;
    }

    body {
    font-family: "Nunito", sans-serif;
    background-color: var(--light-bg);
    color: var(--light-text);
    margin: 0;
    padding: 0;
    line-height: 1.6;
    overflow-x: hidden;
    --text: var(--light-text);
    }

    body[data-theme="dark"] {
    background-color: var(--dark-bg);
    --bg: var(--dark-bg);
    --text: var(--dark-text);
    --card-bg: var(--dark-card-bg);
    }

    #root {
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
      }
`

export default GlobalStyle;