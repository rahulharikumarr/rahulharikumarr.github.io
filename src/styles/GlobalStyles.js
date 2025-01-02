import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #0a192f;
    color: #8892b0;
  }

  html {
    scroll-behavior: smooth;
  }
`;

export default GlobalStyles;
